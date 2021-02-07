export default class CenaPause extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-pause'
        });
    }

    init(data) {
        console.log('init', data.back);
        this.back_scene = data.back;
    }

    create() {
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.cover = this.add.graphics({x: 0, y: 0});
        this.cover.fillStyle('0x000000', 0.3);
        this.cover.fillRect(0, 0, 800, 600);
        this.cover.setDepth(400);
        this.cover.setScrollFactor(0);
    }

    update() {
        if(this.keyP.isDown) this.back();
    }

    back() {
        this.scene.resume(this.back_scene);
        this.scene.stop();
    }
}