import Controller from "./controller.js";
import Player from "./player.js";
import EnemyTimed from "./enemy-time.js";
import Door from "./door.js";
import Shoot from './shoot.js';
import Item from './item.js';

export default class CenaCinco extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-cinco'
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

        //criar um grupo chao
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 1100, 'platform').setOrigin(0,0).setScale(15,5).refreshBody();
        this.ground.create(1400, 1100, 'platform').setOrigin(0,0).setScale(15,5).refreshBody();

        //criar um grupo plataformas
        this.platforms = this.physics.add.group();
        this.platforms.create(650, 1000, 'platform').setOrigin(0,0).setScale(3,2).refreshBody();
        this.platforms.create(850, 900, 'platform').setOrigin(0,0).setScale(8,2).refreshBody();//slime fire
        this.platforms.create(0, 900, 'platform').setOrigin(0,0).setScale(9,2).refreshBody();
        this.platforms.create(850, 800, 'platform').setOrigin(0,0).setScale(6,2).refreshBody();//slime water
        this.platforms.create(150, 800, 'platform').setOrigin(0,0).setScale(6,2).refreshBody();
        this.platforms.create(850, 700, 'platform').setOrigin(0,0).setScale(6,2).refreshBody();//slime grass
        this.platforms.create(150, 700, 'platform').setOrigin(0,0).setScale(6,2).refreshBody();
        this.platforms.create(150, 600, 'platform').setOrigin(0,0).setScale(30,2).refreshBody();

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
        this.itens.push(new Item(this, 850, 550, 'water'));

        
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
            classType: EnemyTimed,
            runChildUpdate: true,
        });
        //adicionar inimigos
        this.enemies.add(new EnemyTimed(this, 900, 850, 'fire', 1000, 5000, 200, 1000));
        this.enemies.add(new EnemyTimed(this, 950, 850, 'fire', 1000, 5000, 200, 1000));
        this.enemies.add(new EnemyTimed(this, 1000, 850, 'fire', 1000, 5000, 200, 1000));
        this.enemies.add(new EnemyTimed(this, 900, 750, 'grass', 1000, 5000, 200, 2000));
        this.enemies.add(new EnemyTimed(this, 950, 750, 'grass', 1000, 5000, 200, 2000));
        this.enemies.add(new EnemyTimed(this, 1000, 750, 'grass', 1000, 5000, 200, 2000));
        this.enemies.add(new EnemyTimed(this, 900, 650, 'water', 1000, 5000, 200, 3000));
        this.enemies.add(new EnemyTimed(this, 950, 650, 'water', 1000, 5000, 200, 3000));
        this.enemies.add(new EnemyTimed(this, 1000, 650, 'water', 1000, 5000, 200, 3000));


        this.enemies.children.iterate(function(enemy) {
            enemy.adjustSpriteBody();
        });

        //coliders
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.platforms);

        //adicionar porta
        this.door = new Door(this, 1945, 1010);
    }

    update(time, delta) {
        let hit = false;
        let pass = false;

        this.time_passed += delta;

        this.time_text.text = 'Time: ' + (this.time_passed/1000.0).toFixed(3).toString();

        if(this.player.sprite.getBottomLeft().y > this.physics.world.bounds.height -50) {
            hit = true
        }

        //restart
        if(this.key.restart.active) {
            this.key.keyPressed(this.key.restart);
            this.scene.start('cena-cinco');
        }

        //pause
        if(this.key.pause.active) {
            this.key.keyPressed(this.key.pause);
            this.pause();
        }

        //player get hitted
        this.physics.overlap(this.enemies_bullets, this.player.sprite, function() {
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

        if(hit) this.scene.start('cena-cinco');
        if(pass) this.passed();

        this.key.update();
        this.player.update(this.key);
    }

    passed() {
        this.game_ends = true;
        let phaseTime = this.time_passed;
            if(localStorage.getItem('faseCinco')) {
                
                if(parseFloat(localStorage.getItem('faseCinco')) < phaseTime) {
                    localStorage.setItem('faseCinco', phaseTime);
                    console.log('new record ', phaseTime);
                }
                else
                console.log('old');
            } else {
                localStorage.setItem('faseCinco', phaseTime);
                console.log('new record ', phaseTime);
            }
        this.scene.start('cena-boss');
    }

    pause() {
        if(this.game_ends) return;

        this.scene.launch('cena-pause', {back: this.scene.key});
        this.scene.pause();
    }
}
