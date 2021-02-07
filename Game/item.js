export default class Item extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, image, element){
        //let sprite_slime;

        // if(element == 'fire') sprite_slime = 'slime-fire';
        // else if(element == 'water') sprite_slime = 'slime-water';
        // else if(element == 'grass') sprite_slime = 'slime-grass';
        super(scene, x, y, image);
        this.element = element;
        scene.add.existing(this);
        scene.physics.add.existing(this, true); //true = static
    }
}