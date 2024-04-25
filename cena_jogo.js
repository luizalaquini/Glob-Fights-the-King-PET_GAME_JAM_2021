import Controller from "./controller.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
import Door from "./door.js";
import Shoot from './shoot.js';
import Item from './item.js';

export default class CenaGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-game'
        });
    }

    preload() {}

    create() {
        this.physics.world.setBounds(0,0,800,600);
        this.game_ends = false;

        this.time_passed = 0;

        //plano de fundo
        this.oceanView = this.add.image(0,0,"oceanView");
        this.oceanView.setOrigin(0,0);

        //criar jogador
        this.player = new Player(this, 10, 40);

        //criar controle
        this.key = new Controller(this);

        this.time_text = this.add.text(20,20,"", {
            font: "25px Arial",
            fill: "white"
        });

        //criar um grupo chao
        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 485, 'oceanView').setOrigin(0,0).refreshBody();

        //criar um grupo plataformas
        this.platforms = this.physics.add.group();
        this.platforms.create(200, 400, 'oceanView').setOrigin(0,0).setScale(0.2,0.08).refreshBody();

        //coliders
        this.physics.add.collider(this.player.sprite, this.ground);
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.platforms.children.iterate(function(platform) {
            platform.body.allowGravity = false;
            platform.body.immovable = true;
            platform.body.checkCollision.left = false;
            platform.body.checkCollision.right = false;
            platform.body.checkCollision.down = false;
        });

        //grupo de itens
        this.itens = this.physics.add.group({
            classType: Item,
        });
        this.itens = new Item(this, 220, 385, 'slime', 'grass');
        
        //configuracao camera
        this.cameras.main.setBounds(0,0,1000,600); //ajustar
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
        this.enemies.add(new Enemy(this, 600, 300, 'water'));

        this.enemies.children.iterate(function(enemy) {
            enemy.adjustSpriteBody();
        });

        //coliders
        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.platforms);

        //adicionar porta
        this.door = new Door(this, 600, 400);
    }

    update(time, delta) {
        let hit = false;
        let pass = false;

        this.time_passed += delta;

        this.time_text.text = 'Time: ' + (this.time_passed/1000.0).toFixed(3).toString();

        //restart
        if(this.key.restart.active) {
            this.key.keyPressed(this.key.restart);
            this.scene.start('cena-game');
        }

        //pause
        if(this.key.pause.active) {
            this.key.keyPressed(this.key.pause);
            this.pause();
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

        if(hit) this.scene.start('cena-game');
        if(pass) this.passed();

        this.key.update();
        this.player.update(this.key);
    }

    passed() {
        this.game_ends = true;
        let phaseTime = this.time_passed;
            if(localStorage.getItem('faseUm')) {
                
                if(parseFloat(localStorage.getItem('faseUm')) < phaseTime) {
                    localStorage.setItem('faseUm', phaseTime);
                    console.log('new record ', phaseTime);
                }
                else
                console.log('old');
            } else {
                localStorage.setItem('faseUm', phaseTime);
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
