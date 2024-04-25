export default class Shoot extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        scene.add.existing(this);
    }

    update() {
        if(this.x > this.scene.physics.world.bounds.width || this.x < 0) {this.destroy;}

    }
}