export default class CenaStory extends Phaser.Scene {
    constructor() {
        super({
            key: 'cena-story'
        });
    }
    create() {
        this.time_passed = 0;
        /*this.text1 = this.add.image(0,0,"text1");
        this.text1.setOrigin(0,0);
        */
        this.text1 = this.add.image(0,0,"text1").setOrigin(0,0).setDepth(1);
        this.text1.visible = false;
        this.text2 = this.add.image(0,0,"text2").setOrigin(0,0).setDepth(2);
        this.text2.visible = false;
        this.text3 = this.add.image(0,0,"text3").setOrigin(0,0).setDepth(3);
        this.text3.visible = false;
        this.text4 = this.add.image(0,0,"text4").setOrigin(0,0).setDepth(4);
        this.text4.visible = false;
        this.text5 = this.add.image(0,0,"text5").setOrigin(0,0).setDepth(5);
        this.text5.visible = false;
        this.text6 = this.add.image(0,0,"text6").setOrigin(0,0).setDepth(6);
        this.text6.visible = false;
        this.text7 = this.add.image(0,0,"text7").setOrigin(0,0).setDepth(7);
        this.text7.visible = false;
        this.text8 = this.add.image(0,0,"text8").setOrigin(0,0).setDepth(8);
        this.text8.visible = false;
        this.text9 = this.add.image(0,0,"text9").setOrigin(0,0).setDepth(9);
        this.text9.visible = false;
        this.text10 = this.add.image(0,0,"text10").setOrigin(0,0).setDepth(9);
        this.text10.visible = false;
    }
    update(time, delta) {
        this.time_passed += delta;
        if(this.time_passed < 10000){
            this.text1.visible = true;
        }
        else if(this.time_passed < 20000){
            this.text2.visible = true;
        }
        else if(this.time_passed < 30000){
            this.text3.visible = true;
        }
        else if(this.time_passed < 40000){
            this.text4.visible = true;
        }
        else if(this.time_passed < 50000){
            this.text5.visible = true;
        }
        else if(this.time_passed < 60000){
            this.text6.visible = true;
        }
        else if(this.time_passed < 70000){
            this.text7.visible = true;
        }
        else if(this.time_passed < 80000){
            this.text8.visible = true;
        }
        else if(this.time_passed < 90000){
            this.text9.visible = true;
        }
        else if(this.time_passed < 100000){
            this.text10.visible = true;
        }
        else if(this.time_passed < 110000){
            localStorage.setItem('jogou', 'true');
            this.scene.start('cena-um');
        }
    }

}