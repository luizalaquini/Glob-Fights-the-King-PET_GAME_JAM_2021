import Secret from './secret.js';
import Shoot from './shoot.js';

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        //player moviments ajust
        this.velocity = 250;
        this.jump = 400;


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
             this.y_position, this.sprite_file, 8);
        
        //player physics
        //this.sprite.setBounce(0.2);
        this.sprite.setBodySize(64, 40, true);
        this.sprite.setCollideWorldBounds(true);
        
        this.element = null;
        this.sprite_element = null;

        if(localStorage.getItem('faseBoss')) {
            console.log('toop')
            this.secret = new Secret(this.scene, this.sprite.x, this.sprite.y);
        }

        //animations
        // this.scene.anims.create({
        //     key: 'idle',
        //     frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
        //     frameRate:20,
        //     skipMissedFrames: true,
        //     repeat: -1
        // });

        this.scene.anims.create({
            key: 'move',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 8, end: 10}),
            frameRate:10,
            skipMissedFrames: true,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move-fire',
            frames: this.scene.anims.generateFrameNumbers('slime-fire', { start: 8, end: 10}),
            frameRate:10,
            skipMissedFrames: true,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move-grass',
            frames: this.scene.anims.generateFrameNumbers('slime-grass', { start: 8, end: 10}),
            frameRate:10,
            skipMissedFrames: true,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'move-water',
            frames: this.scene.anims.generateFrameNumbers('slime-water', { start: 8, end: 10}),
            frameRate:10,
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

    setElement(element) {
        this.element = element;
        this.sprite.anims.stop();
        this.sprite.setTexture('slime-' + element, 8);
    }
    update(controller) {
        let player = this.sprite;
        let time = this.scene.time.now;

        if(localStorage.getItem('faseBoss')) {
            //this.secret.updatado(this.sprite.x, this.sprite.y, this.right);
            

            if(this.right == 1) {
                this.secret.setFlip(false, false);
                this.secret.x = this.sprite.x + 5;
                this.secret.y = this.sprite.y - 15;
            } else {
                this.secret.setFlip(true, false);
                this.secret.x = this.sprite.x - 5;
                this.secret.y = this.sprite.y - 15;
            }
        }
        
        //moviment handlers
        if(controller.left.down) { //left
            player.setVelocityX(-this.velocity);
            player.setFlip(true, false);
            if(this.element == 'fire') {
                player.anims.play('move-fire', true);
            } else if(this.element == 'grass') {
                player.anims.play('move-grass', true);
            } else if(this.element == 'water') {
                player.anims.play('move-water', true);
            }
            else 
                player.anims.play('move', true);
            this.left = true;
            this.right = false;
        }

        else if(controller.right.down) { //right
            player.setVelocityX(this.velocity);
            player.setFlip(false, false);
            if(this.element == 'fire') {
                player.anims.play('move-fire', true);
            } else if(this.element == 'grass') {
                player.anims.play('move-grass', true);
            } else if(this.element == 'water') {
                player.anims.play('move-water', true);
            }
            else 
                player.anims.play('move', true);
            this.left = false;
            this.right = true;
        }
        
        else{ //not left, not right
            player.setVelocityX(0);
            // if(player.body.touching.down) {
            //     player.anims.play('idle', true);
            // }
        }

        if(controller.up.active && player.body.touching.down){ //up/jump
            controller.keyPressed(controller.up);
            player.setVelocityY(-this.jump);
            //player.setFlip(false, false);
            //player.anims.play('jump',true);
        }

        if(controller.spaceBar.down && this.element) { //fire

            if(this.right) {
                
                if(time - this.lastFire > this.fire_rate) {//right
                    this.lastFire = time;
                    let bullet = new Shoot(this.scene, player.x, player.y, 'shoot-' + this.element);
                    this.scene.bullets.add(bullet);
                    bullet.setFlip(false, false);
                    bullet.setVelocityX(this.bullet_velocity);
                    bullet.body.setAllowGravity(false);
                    bullet.setBodySize(40,25,true);
                    bullet.setScale(0.9,0.9);
                }
            }
            else if(this.left) {
                if(time - this.lastFire > this.fire_rate) {//left
                    this.lastFire = time;
                    let bullet = new Shoot(this.scene, player.x, player.y, 'shoot-' + this.element);
                    this.scene.bullets.add(bullet);
                    bullet.setFlip(true, false);
                    bullet.setVelocityX(-this.bullet_velocity);
                    bullet.body.setAllowGravity(false);
                    bullet.setBodySize(40,25,true);
                    bullet.setScale(0.9,0.9);
                }
            }
        }
    }
}
