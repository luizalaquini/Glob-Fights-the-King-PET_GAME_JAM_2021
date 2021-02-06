export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);

        scene.add.existing(this);

        this.scene = scene;
        this.life = 1;
        this.x_position = x;
        this.y_position = y;
        this.x_detection = 400;
        this.y_detection = 100;

        this.fire_rate = 2000;
        this.bullet_velocity = 300;

        this.lastTime = 0;

        this.element = 'water';

        // this.sprite_file = 'slime';
        // this.sprite = this.scene.physics.add.sprite(this.x_position,
        //     this.y_position, this.sprite_file);
        
        // //animations
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
            frameRate:20,
            skipMissedFrames: true,
            repeat: -1
        });

        //this.scene.physics.add.collider(this, this.scene.plataform);

        this.anims.play('idle', true);
    }

    update() {
        super.update();
        let time = this.scene.time.now;
        
        //super.update();
        let player = this.scene.player.sprite;
        //console.log(player);

        if(player.x - this.x < this.x_detection &&
            player.x - this.x > -this.x_detection &&
            player.y - this.y < this.y_detection &&
            player.y - this.y > -this.y_detection) {
                console.log("next to each other");
                if(player.x - this.x < 0) {//left
                    if(time - this.lastTime > this.fire_rate) {
                        this.lastTime = time;
                        let bullet = this.scene.physics.add.image(this.x, this.y, 'shoot');
                        this.scene.enemies_bullets.add(bullet);
                        bullet.setFlip(true, false);
                        bullet.setVelocityX(-this.bullet_velocity);
                        bullet.body.setAllowGravity(false);
                        bullet.setScale(0.2,0.2);
                    }
                } else if(player.x - this.x > 0) {
                    if(time - this.lastTime > this.fire_rate) {//right
                        this.lastTime = time;
                        let bullet = this.scene.physics.add.image(this.x, this.y, 'shoot');
                        this.scene.enemies_bullets.add(bullet);
                        bullet.setFlip(false, false);
                        bullet.setVelocityX(this.bullet_velocity);
                        bullet.body.setAllowGravity(false);
                        bullet.setScale(0.2,0.2);
                    }
                }
                //atirar
        }
    }
}
