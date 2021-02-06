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
        this.oceanView = this.add.image(0,0,"oceanView");
        this.oceanView.setOrigin(0,0);

        this.player = new Player(this, 10, 40);

        this.key = new Controller(this);

        this.add.text(20,20,"In Game", {
            font: "25px Arial",
            fill: "blue"
        });

        this.ground = this.physics.add.staticGroup();
        this.ground.create(0, 485, 'oceanView').setOrigin(0,0).refreshBody();

        this.platforms = this.physics.add.group();
        this.platforms.create(200, 400, 'oceanView').setOrigin(0,0).setScale(0.2,0.08).refreshBody();

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

        this.bullets = this.physics.add.group({
            classType: Shoot,
            runChildUpdate: true,
        });
        this.enemies_bullets = this.physics.add.group({
            runChildUpdate: true,
        });

        this.enemies = this.physics.add.group({
            classType: Boss,
            runChildUpdate: true,
        });
        this.enemies.add(new Boss(this, 600, 300));

        this.physics.add.collider(this.enemies, this.ground);
        this.physics.add.collider(this.enemies, this.platforms);

        // this.powers = this.physics.add.group({
        //     classType: Item,
        // });
    }

    update() {
        let hit = false;
        let pass = false;

        this.physics.overlap(this.enemies_bullets, this.player.sprite, function() {
            console.log('hit');
            hit = true;
        });
        this.physics.overlap(this.bullets, this.enemies, function(bullet, enemy) {
            let power = bullet.texture.key;
            if(enemy.element_id == 0/*fire*/ && power == 'shoot' ||
               enemy.element_id == 1/*water*/ && power == 'shoot' ||
               enemy.element_id == 2/*grass*/ && power == 'shoot')
                enemy.hit();

                if(!enemy.isAlive())
                    pass = true;
            
            bullet.destroy();
        });

        // this.physics.overlap(this.powers, this.player.sprite, function(power, player) {
        //     console.log('power ' );
        //     if(this.key.keys.E.isDown)
        //     console.log('pegou');
        //     player.setElement(power.element);
        // });

        if(hit) this.scene.start('cena-boss');
        if(pass) console.log('venceu');//this.passed();

        this.key.update();
        this.player.update(this.key);
    }

    // passed() {
    //     let phaseTime = this.time.now;
    //         if(localStorage.getItem('faseUm')) {
                
    //             if(parseFloat(localStorage.getItem('faseUm')) < phaseTime) {
    //                 localStorage.setItem('faseUm', phaseTime);
    //                 console.log('new record ', phaseTime);
    //             }
    //             else
    //             console.log('old');
    //         } else {
    //             localStorage.setItem('faseUm', phaseTime);
    //             console.log('new record ', phaseTime);
    //         }
    //     this.scene.start('cena-boss');
    // }
}
