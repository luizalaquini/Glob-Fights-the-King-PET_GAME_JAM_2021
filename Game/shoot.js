const RIGHT = 1;
const LEFT = 0

export default class Shoot extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        this.scene = scene;

        
        this.x_position = x;
        this.y_position = y;
        
        this.velocity = 100;
        this.direction = LEFT;

        this.sprite_file = 'shoot';

        this.sprite = this.scene.physics.add.sprite(this.x_position,
            this.y_position, this.sprite_file);

        this.scene.anims.create({
            key: 'shoot',
            frames: this.scene.anims.generateFrameNumbers('shoot', { start: 24, end: 29}),
            frameRate:20,
            skipMissedFrames: true,
            repeat: -1
        });
    }

    update() {
        let shoot = this.sprite;
        if(this.direction == RIGHT) {
            shoot.setVelocityX(-this.velocity);
            shoot.setFlip(false, false);
            shoot.anims.play('shoot', true);
        } else {//LEFT
            shoot.setVelocityX(this.velocity);
            shoot.setFlip(true, false);
            shoot.anims.play('shoot', true);
        }
    }
}