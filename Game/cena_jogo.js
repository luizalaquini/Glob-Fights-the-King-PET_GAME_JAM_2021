import Controller from "./controller.js";
import Player from "./player.js";
import Enemy from "./enemy.js";
//import Item from "./item.js";

export default class CenaGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-game'
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

        this.plataform = this.physics.add.staticGroup();
        this.plataform.create(0, 485, 'oceanView').setOrigin(0,0).refreshBody();

        this.physics.add.collider(this.player.sprite, this.plataform);
        

        this.cameras.main.setBounds(0,0,800,600); //ajustar
        this.cameras.main.startFollow(this.player.sprite);

        this.bullets = this.physics.add.group({
            runChildUpdate: true,
        });
        this.enemies_bullets = this.physics.add.group({
            runChildUpdate: true,
        });

        this.enemies = [];
        this.enemies.push(new Enemy(this, 600, 300));


    }

    update() {
        this.physics.overlap(this.enemies_bullets, this.player.sprite, function() {
            console.log('hit');
        });

        this.key.update();
        this.player.update(this.key);
        this.enemies.forEach(function(enemy) {
            enemy.update();
        });
    }
}
