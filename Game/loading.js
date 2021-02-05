export default class Loading extends Phaser.Scene {
    constructor() {
        super({
            key: 'loading'
        });
    }

    preload() {
        // const progress_bar = this.add.graphics();
        // console.log("olaaa");

        // this.load.on('progress', (progress) => {
        //     progress_bar.clear();
        //     progress_bar.fillStyle(0xffffff);
        //     progress_bar.fillRect(100, 385, 600 * progress, 30)
        // });

         this.load.on('complete', () => {
             this.scene.start('cena-game');
         });

        this.load.image("oceanView", "images/Ocean_view.png");
        this.load.spritesheet("slime", "images/slime.png", {frameWidth: 64, frameHeight: 64});
        this.load.image("shoot", "images/bullet.png");
        //this.scene.start('cena-game');
    }

    create() {

    }

    update() {

    }
}