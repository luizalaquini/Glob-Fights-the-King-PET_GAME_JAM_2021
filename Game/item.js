export default class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, element){
        super(scene, x, y, element);
        this.element = element;
        scene.add.existing(this);
        scene.physics.add.existing(this, true); //true = static
    }
}