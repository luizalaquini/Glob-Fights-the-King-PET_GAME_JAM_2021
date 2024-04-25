export default class Secret extends Phaser.GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'secret');
        scene.add.existing(this);
        this.setFlip(false, false);
    }

    // updatado(player_x, player_y, position) {
    //     super.update();

    //     this.x = player_x;
    //     this.y = player_y;

    //     if(position == 1) {
    //         this.setFlip(true, false);
    //     } else {
    //         this.setFlip(true, false);
    //     }
    // }
} 