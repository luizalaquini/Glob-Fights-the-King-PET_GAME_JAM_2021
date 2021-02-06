export default class Item extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, element){
        if(element == 'fire');
        else if(element == 'water');
        else if(element == 'grass');
        super(scene, x, y, 'shoot');
        scene.add.existing(this);
    }
}