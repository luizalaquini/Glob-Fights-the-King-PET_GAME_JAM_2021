export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'slime');

        scene.add.existing(this);

        this.life = 5;
        this.jump_force = 350;

        this.element_id = 0;
        this.element = ['fire', 'water', 'grass'];
        this.lastForm = 0;

        this.fire_rate = 3000;

        this.time_to_jump = 3000;
        this.time_last_jump = 0;
    }

    update() {
        let time = this.scene.time.now;
        super.update();

        if(time - this.lastForm > 7000) {
            this.lastForm = time;
            this.changeElement()
        }

        if(time - this.time_last_jump > this.time_to_jump) {
            this.time_last_jump = time;
            this.jump();
        }
        //console.log(this.element[this.element_id]);
    }

    jump() {
        this.time_to_jump = Math.floor(5 + (Math.random() * 3)) * 1000;
        if(this.body.touching.down)
            this.setVelocityY(-this.jump_force);
    }

    changeElement() {
        let random_number;

        do {
            random_number = Math.floor(Math.random() * 3);
        } while(random_number == this.element_id);
        this.element_id = random_number;

        console.log(this.element[this.element_id])
        //this.loadTexture(this.element[this.element_id]);
    }

    hit() {
        this.life--;
        this.lastForm = this.scene.time.now;
        if(this.life == 0) this.destroy();
        this.changeElement();
    }

    isAlive() {
        return this.life;
    }
}