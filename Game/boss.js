import Shoot from './shoot.js';

export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'slime-fire', 8);

        scene.add.existing(this);

        this.life = 5;
        this.jump_force = 350;

        this.element_id = 0;
        this.element = ['fire', 'water', 'grass'];
        this.lastForm = 0;

        this.fire_rate = 3000;
        this.bullet_velocity = 300;
        this.lastTime = 0;

        this.time_to_jump = 3000;
        this.time_last_jump = 0;

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

        this.setFlip(true, false);

        this.anims.play('move-fire', true);
    }

    update() {
        let time = this.scene.time.now;
        super.update();

        if(time - this.lastForm > 7000) {
            this.lastForm = time;
            this.changeElement()
        }

        if(time - this.time_last_jump > this.time_to_jump) {
            this.time_last_jump = time;
            this.jump();
        }

        if(time - this.lastTime > this.fire_rate) {
            this.lastTime = time;
            let bullet = new Shoot(this.scene, this.x, this.y, ('shoot-' + (this.element[this.element_id])));
            this.scene.enemies_bullets.add(bullet);
            bullet.setFlip(true, false);
            bullet.setVelocityX(-this.bullet_velocity);
            bullet.body.setAllowGravity(false);
            bullet.setBodySize(40,25,true);
            bullet.setScale(0.9,0.9);
            this.scene.sound.play('sound-' + this.element[this.element_id]);
        }
    }

    adjustSpriteBody() {
        this.setBodySize(64, 40, true);
    }

    jump() {
        this.time_to_jump = Math.floor(5 + (Math.random() * 3)) * 1000;
        if(this.body.touching.down)
            this.setVelocityY(-this.jump_force);
    }

    changeElement() {
        let random_number;

        if(!this.isAlive()) return;

        do {
            random_number = Math.floor(Math.random() * 3);
        } while(random_number == this.element_id);
        this.element_id = random_number;

        this.setFlip(true, false);
        this.anims.play('move-' + this.element[this.element_id], true);
    }

    hit() {
        this.life--;
        this.lastForm = this.scene.time.now;
        if(this.life == 0) this.destroy();
        this.changeElement();
    }

    isAlive() {
        return this.life;
    }
}