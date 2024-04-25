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
            this.scene.start('cena-menu');
        });

        this.load.image("oceanView", "images/Ocean_view.png");
        this.load.image("background-bottom", "images/background.png");
        this.load.image("menu-back", "images/menu_back.png");
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
        this.load.audio("music", "sounds/music.mp3");
        this.load.image("e", "images/keys/E.png");
        this.load.image("r", "images/keys/R.png");
        this.load.image("p", "images/keys/P.png");
        this.load.image("space", "images/keys/space.png");
        this.load.image("arrows", "images/keys/arrows.png");
        this.load.image("text1", "images/texts/text1.png");
        this.load.image("text2", "images/texts/text2.png");
        this.load.image("text3", "images/texts/text3.png");
        this.load.image("text4", "images/texts/text4.png");
        this.load.image("text5", "images/texts/text5.png");
        this.load.image("text6", "images/texts/text6.png");
        this.load.image("text7", "images/texts/text7.png");
        this.load.image("text8", "images/texts/text8.png");
        this.load.image("text9", "images/texts/text9.png");
        this.load.image("text10", "images/texts/text10.png");
        this.load.image("creditos", "images/texts/creditos.png");
        this.load.image("creditos1", "images/texts/creditos1.png");
        this.load.image("creditos2", "images/texts/creditos2.png");
        this.load.image("nome", "images/nome.png");
    }

    create() {

    }

    update() {

    }
}