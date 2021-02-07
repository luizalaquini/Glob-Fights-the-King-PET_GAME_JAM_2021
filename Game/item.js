export default class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, element){
        if(element == 'fire');
        else if(element == 'water');
        else if(element == 'grass');
        super(scene, x, y, element);
        this.element = element;
        scene.add.existing(this);
        scene.physics.add.existing(this, true); //true = static
    }
}