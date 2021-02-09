export default class CenaMenu extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-menu'
        });
    }

    create() {
        this.background = this.add.image(0,0,"menu-back");
        this.background.setOrigin(0,0);

        this.play_buttom = this.add.text(400,400,"Jogar", {
            font: "25px Arial",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);
        this.play_buttom.setInteractive();
        this.play_buttom.on("pointerup", () => {
            //clicked
            if(localStorage.getItem('jogou') == 'true')
                this.scene.start('cena-um');
            else this.scene.start('cena-story');
        });

        this.controles_buttom = this.add.text(400,500,"Controles", {
            font: "25px Arial",
            fill: "yellow"
        }).setOrigin(0.5, 0.5);
        this.controles_buttom.setInteractive();
        this.controles_buttom.on("pointerup", () => {
            //clicked
            //this.scene.start('cena-um');
            this.controles();
        });

        this.sound.stopByKey('music');
        this.music = this.sound.add('music');

        this.music.play({
            loop: true,
        });


        this.cover = this.add.graphics({x: 0, y: 0});
        this.cover.fillStyle('0x000000', 0.7);
        this.cover.fillRect(0, 0, 800, 600);
        this.cover.visible = false;
        this.cover.setDepth(400);

        this.voltar = this.add.text(50,20,"Voltar", {
            font: "25px Arial",
            fill: "white"
        }).setOrigin(0.5, 0.5);
        this.voltar.visible = false;
        this.voltar.setDepth(401);

        this.voltar.setInteractive();
        this.voltar.on("pointerup", () => {
            //clicked
            if(this.voltar.visible)
                this.controles();
        });

        this.e = this.add.image(200, 100,'e').setScale(0.8, 0.8).setDepth(401);
        this.e.visible = false;
        this.p = this.add.image(200, 180, 'p').setScale(0.8, 0.8).setDepth(401);
        this.p.visible = false;
        this.r = this.add.image(200, 260, 'r').setScale(0.8, 0.8).setDepth(401);
        this.r.visible = false;
        this.space = this.add.image(200, 340, 'space').setScale(0.25,0.25).setDepth(401);
        this.space.visible = false;
        this.arrows = this.add.image(200, 420, 'arrows').setScale(0.05, 0.05).setDepth(401);
        this.arrows.visible = false;

        this.e_text = this.add.text(400,100,"Pegar Item", {
            font: "25px Arial",
            fill: "white"
        });
        this.e_text.visible = false;
        this.e_text.setDepth(401);

        this.p_text = this.add.text(400,180,"Pausar", {
            font: "25px Arial",
            fill: "white"
        });
        this.p_text.visible = false;
        this.p_text.setDepth(401);

        this.r_text = this.add.text(400,260,"Restart", {
            font: "25px Arial",
            fill: "white"
        });
        this.r_text.visible = false;
        this.r_text.setDepth(401);

        this.space_text = this.add.text(400,340,"Atirar", {
            font: "25px Arial",
            fill: "white"
        });
        this.space_text.visible = false;
        this.space_text.setDepth(401);

        this.arrow_text = this.add.text(400,420,"Mover", {
            font: "25px Arial",
            fill: "white"
        });
        this.arrow_text.visible = false;
        this.arrow_text.setDepth(401);
    }

    controles() {
        this.voltar.visible = !this.voltar.visible;
        this.cover.visible = !this.cover.visible;
        this.e_text.visible = !this.e_text.visible;
        this.r_text.visible = !this.r_text.visible;
        this.p_text.visible = !this.p_text.visible;
        this.space_text.visible = !this.space_text.visible;
        this.arrow_text.visible = !this.arrow_text.visible;
        this.e.visible = !this.e.visible;
        this.p.visible = !this.p.visible;
        this.r.visible = !this.r.visible;
        this.space.visible = !this.space.visible;
        this.arrows.visible = !this.arrows.visible;
    }
}