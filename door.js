export default class Door extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'door');
        scene.add.existing(this);
        scene.physics.add.existing(this, true); //true = static
    }
} 