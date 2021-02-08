export default class Loading extends Phaser.Scene {
    constructor() {
        super({
            key: 'loading'
        });
    }

    preload() {
        const progress_bar = this.add.graphics();

        this.load.on('progress', (progress) => {
            progress_bar.clear();
            progress_bar.fillStyle(0xffffff);
            progress_bar.fillRect(100, 385, 600 * progress, 30)
        });

        this.load.on('complete', () => {
            this.scene.start('cena-boss');
        });

        this.load.image("oceanView", "images/Ocean_view.png");
        this.load.image("background-bottom", "images/background.png");
        this.load.image("background", "images/background_top.png");
        this.load.image("platform", "images/platform.png");
        this.load.image("prison", "images/prison.png");
        this.load.image("throne", "images/throne.png");
        this.load.spritesheet("slime", "images/slime_principal.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("slime-fire", "images/slime_fire.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("slime-grass", "images/slime_grass.png", {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet("slime-water", "images/slime_water.png", {frameWidth: 64, frameHeight: 64});
        this.load.image("shoot", "images/bullet.png");
        this.load.image("shoot-water", "images/water_shoot.png");
        this.load.image("shoot-grass", "images/grass_shoot.png");
        this.load.image("shoot-fire", "images/fire_shoot.png");
        this.load.image("door", "images/door.png");
        this.load.image("fire", "images/fire.png");
        this.load.image("grass", "images/grass.png");
        this.load.image("water", "images/water.png");
        this.load.image("secret", "images/secret.png");
        this.load.audio("sound-fire", "sounds/fire_sound.mp3");
        this.load.audio("sound-water", "sounds/water_sound.mp3");
        this.load.audio("sound-grass", "sounds/grass_sound.mp3");
    }

    create() {

    }

    update() {

    }
}