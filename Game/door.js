export default class Door extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shoot');
        scene.add.existing(this);
        scene.physics.add.existing(this, true); //true = static
    }
} 