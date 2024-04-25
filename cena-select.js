export default class CenaSelect extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-select'
        });
    }

    create() {
        this.um = localStorage.getItem('faseUm');
        this.dois = localStorage.getItem('faseDois');
        this.tres = localStorage.getItem('faseTres');
        this.quatro = localStorage.getItem('faseQuatro');
        this.cinco = localStorage.getItem('faseCinco');

        //button.setInteractive();
        //button.on("pointerup", () => {
            //clicked
        // });
    }
}