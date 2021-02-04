export default class Enemy {
    constructor(scene, x, y) {
        this.scene = scene;

        this.life = 1;
        this.x_position = x;
        this.y_position = y;
        this.x_detection = 400;
        this.y_detection = 100;

        this.sprite_file = 'slime';
        this.sprite = this.scene.physics.add.sprite(this.x_position,
            this.y_position, this.sprite_file);
        
        //animations
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('slime', { start: 16, end: 23}),
            frameRate:20,
            skipMissedFrames: true,
            repeat: -1
        });

        this.sprite.anims.play('idle', true);
    }

    update() {
        let player = this.scene.player.sprite;

        if(player.x - this.sprite.x < this.x_detection &&
            player.x - this.sprite.x > -this.x_detection &&
            player.y - this.sprite.y < this.y_detection &&
            player.y - this.sprite.y > -this.y_detection) {
                console.log("next to each other");
                //atirar
        }
    }
}