const RIGHT = 1;
const LEFT = 0

export default class Shoot {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x_position = x;
        this.y_position = y;

        super(scene, this.x_position, this.y_position, "shoot");  
    }

}