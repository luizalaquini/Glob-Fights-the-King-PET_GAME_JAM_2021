export default class CenaMusica extends Phaser.Scene {
    // init(data) {
    //     if(data.play == true) this.play = true;
    //     else this.play = false;
    // }
    
    constructor() {
        super({
            key: 'cena-musica'
        });
    }
    create() {
        this.music = this.sound.add('music');

        this.music.play({
            loop: true,
        });
    }

}