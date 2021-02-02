export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite_file = 'slime';
        this.velocity = 140;
        this.jump = 100;
        this.x_position = x;
        this.y_position = y;
        this.sprite = this.scene.physics.add.sprite(this.x_position,
             this.y_position, this.sprite_file);
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
        this.element = null;

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
            frameRate:20,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 0, end: 7}),
            frameRate:20,
            repeat: -1
        });

        

        /*this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
            frameRate:10,
            repeat: -1
        });*/
    }

    /*setElement(element) {
        this.element = element;
        //mudar a sprite
    }*/

    update(controller) {
        let player = this.sprite;
        
        if(controller.left.isDown) {
            player.setVelocityX(-this.velocity);
            player.setFlip(false, false);
            player.anims.play('move');
        }

        else if(controller.right.isDown) {
            player.setVelocityX(this.velocity);
            player.setFlip(true, false);
            player.anims.play('move');
        }

        //else if(this.keys.down.isDown){
            //player.setVelocityY(this.velocity);
            //player.setFlip(false, false);
        //}
        
        else{
            player.setVelocityX(0);
            if(player.body.touching.down) {
                player.anims.play('idle');
            }
        }

        if(controller.up.isDown && player.body.touching.down){
            player.setVelocityY(-this.jump);
            //player.setFlip(false, false);
            //player.anims.play('jump');
        }
    }
}