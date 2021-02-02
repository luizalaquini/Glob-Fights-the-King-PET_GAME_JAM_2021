class Scene1 extends Phaser.Scene{
    constructor(){
        super("loanding");
    }

    preload(){
        this.load.image("oceanView", "imagens/Ocean_view.png");
    }

    create(){
        this.add.text(20,20,"Loanding Game...");
        this.scene.start("inGame");
    }
}
