export default class CenaCreditos extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-creditos'
        });
    }
    create() {
        this.time_passed = 0;
    }
    update(time, delta) {
        this.time_passed += delta;
        if(this.time_passed < 7000) this.add.image(0,0,"creditos").setOrigin(0,0);
        if(this.time_passed < 14000) this.add.image(0,0,"creditos1").setOrigin(0,0);
        if(this.time_passed < 21000) this.add.image(0,0,"creditos2").setOrigin(0,0);
        else if(this.time_passed > 21000) this.scene.start('cena-menu');
    }

}