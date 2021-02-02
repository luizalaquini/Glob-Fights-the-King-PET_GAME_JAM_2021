import Controller from "./controller.js";
import Player from "./player.js";
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
        let key = new Controller(this);
        this.keys = key.keys;
        this.add.text(20,20,"In Game", {
            font: "25px Arial",
            fill: "blue"
        });

        const plataform = this.physics.add.staticGroup();
        plataform.create(0, 485, 'oceanView').setOrigin(0,0).refreshBody();

        this.physics.add.collider(this.player.sprite, plataform);

    }

    update() {
        this.player.update(this.keys);
        /*
        const player = this.player.sprite;
        

        if(this.keys.left.isDown) {
            player.setVelocityX(-this.player.velocity);
            player.setFlip(false, false);
            //player.anims.play('moving');
        }

        else if(this.keys.right.isDown) {
            player.setVelocityX(this.player.velocity);
            player.setFlip(true, false);
            //player.anims.play('moving');
        }

        //else if(this.keys.down.isDown){
            //player.setVelocityY(this.player.velocity);
            //player.setFlip(false, false);
        //}
        
        else{
            player.setVelocityX(0);
        }

        if(this.keys.up.isDown && player.body.touching.down){
            player.setVelocityY(-this.player.jump);
            player.setFlip(false, false);
            //player.anims.play('jump');
        }

        //if(this.keys.x.isDown && )
        */
    }
}