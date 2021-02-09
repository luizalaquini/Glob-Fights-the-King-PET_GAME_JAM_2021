import Controller from "./controller.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
import Boss from "./boss.js";
import Shoot from './shoot.js';
import Item from './item.js';

export default class CenaBoss extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-boss'
        });
    }

    preload() {
        
    }

    create() {
        this.physics.world.setBounds(0,0,650,600);
        this.game_ends = false;

        this.time_passed = 0;

        this.oceanView = this.add.image(0,0,"throne");
        this.oceanView.setOrigin(0,0);

        this.player = new Player(this, 30, 525);

        this.key = new Controller(this);

        this.time_text = this.add.text(20,20,"", {
            font: "25px Arial",
            fill: "white"
        });

        this.menu_button = this.add.text(650,20,"Main Menu", {
            font: "25px Arial",
            fill: "white"
        }).setDepth(400);
        this.menu_button.setScrollFactor(0);

        this.menu_button.setInteractive();
        this.menu_button.on("pointerup", () => {
            //clicked
            this.scene.start('cena-menu');
        });

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 545, 'oceanView').setOrigin(0,0).refreshBody();

        this.platforms = this.physics.add.group();
        this.platforms.create(100, 450, 'platform').setOrigin(0,0).setScale(6,2).refreshBody();

        this.physics.add.collider(this.player.sprite, this.ground);
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.platforms.children.iterate(function(platform) {
            platform.body.allowGravity = false;
            platform.body.immovable = true;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.down = false;
        });
        

        this.cameras.main.setBounds(0,0,800,600); //ajustar
        this.cameras.main.startFollow(this.player.sprite);
        
        //grupo de itens
        // this.itens = this.physics.add.group({
        //     classType: Item,
        // });
        this.itens = [];
        this.itens.push(new Item(this, 150, 400, 'grass'));
        this.itens.push(new Item(this, 250, 400, 'water'));
        this.itens.push(new Item(this, 350, 400, 'fire'));

        this.bullets = this.physics.add.group({
            classType: Shoot,
            runChildUpdate: true,
        });
        this.enemies_bullets = this.physics.add.group({
            classType: Shoot,
            runChildUpdate: true,
        });

        this.enemies = this.physics.add.group({
            classType: Boss,
            runChildUpdate: true,
        });
        this.enemies.add(new Boss(this, 600, 500));

        this.enemies.children.iterate(function(enemy) {
            enemy.adjustSpriteBody();
        });

        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.platforms);
    }

    update(time, delta) {
        let hit = false;
        let pass = false;

        this.time_passed += delta;

        this.time_text.text = 'Time: ' + (this.time_passed/1000.0).toFixed(3).toString();

        //restart
        if(this.key.restart.active) {
            this.key.keyPressed(this.key.restart);
            this.scene.start('cena-boss');
        }

        //pause
        if(this.key.pause.active) {
            this.key.keyPressed(this.key.pause);
            this.pause();
        }

        this.physics.overlap(this.enemies_bullets, this.player.sprite, function() {
            console.log('hit');
            hit = true;
        });

        this.physics.overlap(this.bullets, this.enemies, function(bullet, enemy) {
            let power = bullet.texture.key;
            if(enemy.element_id == 0/*fire*/ && power == 'shoot-water' ||
               enemy.element_id == 1/*water*/ && power == 'shoot-grass' ||
               enemy.element_id == 2/*grass*/ && power == 'shoot-fire')
                enemy.hit();

                if(!enemy.isAlive())
                    pass = true;
            
            bullet.destroy();
        });

        this.physics.overlap(this.enemies_bullets, this.player.sprite, function() {
            console.log('hit');
            hit = true;
        });

        //bullets collide
        this.physics.overlap([this.bullets, this.enemies_bullets], this.platforms, function(bullet) {
            bullet.destroy()
        });

        //player get item
        this.physics.overlap(this.itens, this.player.sprite, function(power, player) {
            //console.log('power ', power.element);
            if(power.scene.key.grab.active) {
                console.log('pegou');
                console.log(power.element);
                power.scene.key.keyPressed(power.scene.key.grab);
                player.scene.player.setElement(power.element);
            }
        //     player.setElement(power.element);
        });

        if(hit) this.scene.start('cena-boss');
        if(pass) this.passed();

        this.key.update();
        this.player.update(this.key);
    }

    passed() {
        let phaseTime = this.time.now;
            if(localStorage.getItem('faseBoss')) {
                
                if(parseFloat(localStorage.getItem('faseBoss')) < phaseTime) {
                    localStorage.setItem('faseBoss', phaseTime);
                    console.log('new record ', phaseTime);
                }
                else
                console.log('old');
            } else {
                localStorage.setItem('faseBoss', phaseTime);
                console.log('new record ', phaseTime);
            }
        this.scene.start('cena-creditos');
    }

    pause() {
        if(this.game_ends) return;

        this.scene.launch('cena-pause', {back: this.scene.key});
        this.scene.pause();
    }
}
