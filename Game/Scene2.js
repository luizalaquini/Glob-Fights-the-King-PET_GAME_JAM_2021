class Scene2 extends Phaser.Scene{
    constructor(){
        super("inGame");
    }
    create(){
        this.oceanView = this.add.image(0,0,"oceanView");
        this.oceanView.setOrigin(0,0);

        this.add.text(20,20,"In Game", {
            font: "25px Arial",
            fill: "blue"
        });
    }
}