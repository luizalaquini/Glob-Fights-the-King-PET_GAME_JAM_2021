import Controller from "./controller.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
import Door from "./door.js";
import Shoot from './shoot.js';
import Item from './item.js';

export default class CenaDois extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-dois'
        });
    }

    preload() {}

    create() {
        this.physics.world.setBounds(0,0,2000,1200);
        this.game_ends = false;

        this.time_passed = 0;

        //plano de fundo
        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0).setFlip(false, true);
        this.background = this.add.image(0,600,"background-bottom");
        this.background.setOrigin(0,0);
        this.background = this.add.image(800,0,"background");
        this.background.setOrigin(0,0).setFlip(false, true);
        this.background = this.add.image(800,600,"background-bottom");
        this.background.setOrigin(0,0);
        this.background = this.add.image(1600,0,"background");
        this.background.setOrigin(0,0).setFlip(false, true);
        this.background = this.add.image(1600,600,"background-bottom");
        this.background.setOrigin(0,0);

        //criar jogador
        this.player = new Player(this, 10, 1070);

        //criar controle
        this.key = new Controller(this);

        this.time_text = this.add.text(20,20,"", {
            font: "25px Arial",
            fill: "white"
        });
        this.time_text.setScrollFactor(0);

        //criar um grupo chao
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1100, 'platform').setOrigin(0,0).setScale(8,5).refreshBody();

        //criar um grupo plataformas
        this.platforms = this.physics.add.group();
        this.platforms.create(650, 1000, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(1150, 1000, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(0, 870, 'platform').setOrigin(0,0).setScale(9.6,2).refreshBody(); //fire enemy
        this.platforms.create(730, 750, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(1150, 650, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(1600, 650, 'platform').setOrigin(0,0).setScale(8,2).refreshBody();//grass enemy
        this.platforms.create(1840, 530, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(1840, 410, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(740, 410, 'platform').setOrigin(0,0).setScale(16,2).refreshBody();
        this.platforms.create(0, 410, 'platform').setOrigin(0,0).setScale(9,2).refreshBody();//water enemy + final stage




        this.platforms.children.iterate(function(platform) {
            platform.body.allowGravity = false;
            platform.body.immovable = true;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.down = false;
        });

        //coliders
        this.physics.add.collider(this.player.sprite, this.ground);
        this.physics.add.collider(this.player.sprite, this.platforms);

        //grupo de itens
        // this.itens = this.physics.add.group({
        //     classType: Item,
        //     allowGravity: false,
        //     immovable: true,
        // });
        this.itens = []
        this.itens.push(new Item(this, 730, 950, 'fire'));
        this.itens.push(new Item(this, 1200, 970, 'water'));
        this.itens.push(new Item(this, 1210, 620, 'grass'));

        
        //configuracao camera
        this.cameras.main.setBounds(0,0,2000,1200); //ajustar
        this.cameras.main.startFollow(this.player.sprite);

        //grupo de projeteis
        this.bullets = this.physics.add.group({
            classType: Shoot,
            runChildUpdate: true,
        });
        this.enemies_bullets = this.physics.add.group({
            classType: Shoot,
            runChildUpdate: true,
        });

        //grupo de inimigos
        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true,
        });
        //adicionar inimigos
        this.enemies.add(new Enemy(this, 100, 750, 'fire'));
        this.enemies.add(new Enemy(this, 1950, 550, 'grass'));
        this.enemies.add(new Enemy(this, 250, 380, 'water'));


        this.enemies.children.iterate(function(enemy) {
            enemy.adjustSpriteBody();
        });

        //coliders
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.platforms);

        //adicionar porta
        this.door = new Door(this, 50, 320);
    }

    update(time, delta) {
        let hit = false;
        let pass = false;

        this.time_passed += delta;

        this.time_text.text = 'Time: ' + (this.time_passed/1000.0).toFixed(3).toString();

        //restart
        if(this.key.restart.active) {
            this.key.keyPressed(this.key.restart);
            this.scene.start('cena-dois');
        }

        //pause
        if(this.key.pause.active) {
            this.key.keyPressed(this.key.pause);
            this.pause();
        }

        if(this.player.sprite.getBottomLeft().y > this.physics.world.bounds.height -50) {
            hit = true
        }

        //player get hitted
        this.physics.overlap(this.enemies_bullets, this.player.sprite, function() {
            console.log('hit');
            hit = true;
        });

        //enemies get hitted
        this.physics.overlap(this.bullets, this.enemies, function(bullet, enemy) {
            let power = bullet.texture.key;
            if(enemy.element == 'water' && power == 'shoot-grass' ||
               enemy.element == 'fire' && power == 'shoot-water' ||
               enemy.element == 'grass' && power == 'shoot-fire')
                enemy.destroy();
            
            bullet.destroy()
        });

        //bullets collide
        this.physics.overlap([this.bullets, this.enemies_bullets], this.platforms, function(bullet) {
            bullet.destroy()
        });

        //player touch the door
        this.physics.overlap(this.door, this.player.sprite, function() {
            console.log('door');
            pass = true;
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

        if(hit) this.scene.start('cena-dois');
        if(pass) this.passed();

        this.key.update();
        this.player.update(this.key);
    }

    passed() {
        this.game_ends = true;
        let phaseTime = this.time_passed;
            if(localStorage.getItem('faseDois')) {
                
                if(parseFloat(localStorage.getItem('faseDois')) < phaseTime) {
                    localStorage.setItem('faseDois', phaseTime);
                    console.log('new record ', phaseTime);
                }
                else
                console.log('old');
            } else {
                localStorage.setItem('faseDois', phaseTime);
                console.log('new record ', phaseTime);
            }
        this.scene.start('cena-tres');
    }

    pause() {
        if(this.game_ends) return;

        this.scene.launch('cena-pause', {back: this.scene.key});
        this.scene.pause();
    }
}
