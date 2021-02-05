export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        //player moviments ajust
        this.velocity = 250;
        this.jump = 200;


        //player start position
        this.x_position = x;
        this.y_position = y;

        //player facing
        this.right = true;
        this.left = false;
        this.fire_rate = 1000;
        this.lastFire = 0;
        this.bullet_velocity = 300;

        this.sprite_file = 'slime';
        this.sprite = this.scene.physics.add.sprite(this.x_position,
             this.y_position, this.sprite_file);
        
        //player physics
        //this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
        
        this.element = null;

        //animations
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
            frameRate:20,
            skipMissedFrames: true,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 0, end: 7}),
            frameRate:20,
            skipMissedFrames: true,
            repeat: -1
        });

        /*this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
            frameRate:10,
            skipMissedFrames: true,
            repeat: -1
        });*/

    }

    /*setElement(element) {
        this.element = element;
        //mudar a sprite
    }*/
    update(controller) {
        let player = this.sprite;
        let time = this.scene.time.now;
        
        //moviment handlers
        if(controller.left.down) { //left
            player.setVelocityX(-this.velocity);
            player.setFlip(false, false);
            player.anims.play('move', true);
            this.left = true;
            this.right = false;
        }

        else if(controller.right.down) { //right
            player.setVelocityX(this.velocity);
            player.setFlip(true, false);
            player.anims.play('move', true);
            this.left = false;
            this.right = true;
        }
        
        else{ //not left, not right
            player.setVelocityX(0);
            if(player.body.touching.down) {
                player.anims.play('idle', true);
            }
        }

        if(controller.up.active && player.body.touching.down){ //up/jump
            controller.keyPressed(controller.up);
            player.setVelocityY(-this.jump);
            //player.setFlip(false, false);
            //player.anims.play('jump',true);
        }

        if(controller.spaceBar.down) { //fire

            if(this.right) {
                
                if(time - this.lastFire > this.fire_rate) {
                    this.lastFire = time;
                    let bullet = this.scene.physics.add.image(player.x, player.y, 'shoot');
                    this.scene.bullets.add(bullet);
                    bullet.setFlip(false, false);
                    bullet.setVelocityX(this.bullet_velocity);
                    bullet.body.setAllowGravity(false);
                }
            }
            else if(this.left) {
                if(time - this.lastFire > this.fire_rate) {
                    this.lastFire = time;
                    let bullet = this.scene.physics.add.image(player.x, player.y, 'shoot');
                    this.scene.bullets.add(bullet);
                    bullet.setFlip(true, false);
                    bullet.setVelocityX(-this.bullet_velocity);
                    bullet.body.setAllowGravity(false);
                }
            }
        }
    }
}
