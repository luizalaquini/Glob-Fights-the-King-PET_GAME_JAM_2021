export default class Item {
    constructor(element, x, y){
        this.x_position = x;
        this.y_position = y;
        this.sprite_file = '';
        this.sprite = this.scene.physics.add.sprite(this.x_position,
            this.y_position, this.sprite_file);
        this.element = element;
    }
}