import Shoot from './shoot.js';

export default class EnemyTimed extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, element, distance = 400, fire_rate = 2000, distance_y = 100, time_to_start_to_fire = 0) {
        
        super(scene, x, y, 'slime-' + element);

        scene.add.existing(this);

        this.scene = scene;
        this.life = 1;
        this.x_position = x;
        this.y_position = y;
        this.x_detection = distance;
        this.y_detection = distance_y;

        this.time_passed = 0;
        this.fire_rate = fire_rate;
        this.bullet_velocity = 300;
        this.waited = false;
        this.fire_delay = time_to_start_to_fire;

        this.lastTime = 0;

        this.element = element;
        
        // //animations
        this.scene.anims.create({
            key: 'idle-' + this.element,
            frames: this.scene.anims.generateFrameNumbers('slime-' + this.element, { start: 8, end: 10}),
            frameRate:10,
            skipMissedFrames: true,
            repeat: -1
        });

        this.setFlip(true, false);

        this.anims.play('idle-' + this.element, true);
    }

    adjustSpriteBody() {
        this.setBodySize(64, 40, true);
    }

    update(time, delta) {
        super.update();

        let player = this.scene.player.sprite;
        this.time_passed += delta;

        if(this.time_passed > this.fire_delay && !this.waited) {
            this.waited = true;
            this.time_passed = this.fire_rate+1;
        }
        if(this.waited) {
            if(player.x - this.x < 0) {//left
                this.setFlip(true, false);
                if(this.time_passed - this.lastTime > this.fire_rate) {
                    this.lastTime = this.time_passed;
                    let bullet = new Shoot(this.scene, this.x, this.y, 'shoot-' + this.element);
                    this.scene.enemies_bullets.add(bullet);
                    bullet.setFlip(true, false);
                    bullet.setVelocityX(-this.bullet_velocity);
                    bullet.body.setAllowGravity(false);
                    bullet.setBodySize(40,25,true);
                    bullet.setScale(0.9,0.9);
                }
            } else if(player.x - this.x > 0) {
                this.setFlip(false, false);
                if(this.time_passed - this.lastTime > this.fire_rate) {//right
                    this.lastTime = this.time_passed;
                    let bullet = new Shoot(this.scene, this.x, this.y, 'shoot-' + this.element);
                    this.scene.enemies_bullets.add(bullet);
                    bullet.setFlip(false, false);
                    bullet.setVelocityX(this.bullet_velocity);
                    bullet.body.setAllowGravity(false);
                    bullet.setBodySize(40,25,true);
                    bullet.setScale(0.9,0.9);
                }
            }
        }
    }
}
