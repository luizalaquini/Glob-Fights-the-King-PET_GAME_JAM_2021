export default class CenaCreditos extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-creditos'
        });
    }
    create() {
        this.time_passed = 0;
        this.creditos = this.add.image(0,0,"creditos").setOrigin(0,0).setDepth(1);
        this.creditos.visible = false;
        this.creditos1 = this.add.image(0,0,"creditos1").setOrigin(0,0).setDepth(2);
        this.creditos1.visible = false;
        this.creditos2 = this.add.image(0,0,"creditos2").setOrigin(0,0).setDepth(3);
        this.creditos2.visible = false;
    }
    update(time, delta) {
        this.time_passed += delta;
        if(this.time_passed < 7000) this.creditos.visible = true;
        else if(this.time_passed < 14000) this.creditos1.visible = true;
        else if(this.time_passed < 21000) this.creditos2.visible = true;
        else if(this.time_passed > 21000) this.scene.start('cena-menu');
    }

}