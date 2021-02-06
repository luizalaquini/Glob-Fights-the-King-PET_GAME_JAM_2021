export default class Shoot extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {
        
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.power = 'fire';
    }
}