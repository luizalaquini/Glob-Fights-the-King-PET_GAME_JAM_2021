export default class Controller {
    constructor(scene) {
        this.keys = scene.input.keyboard.createCursorKeys();
        this.spaceBar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyP = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.left = new Key();
        this.right = new Key();
        this.up = new Key();
        this.pause = new Key();
        this.restart = new Key();
        this.grab = new Key();

    }

    keyPressed(key) {
        key.active = false;
    }

    update() {
        if(this.keys.left.isDown) {
            if(!this.left.down) this.left.active = true;
            this.left.down = true;
        } else if(!this.keys.left.isDown) {
            this.left.active = false;
            this.left.down = false;
        }
        

        if(this.keys.right.isDown) {
            if(!this.right.down) this.right.active = true;
            this.right.down = true;
        } else if(!this.keys.right.isDown) {
            this.right.active = false;
            this.right.down = false;
        }

        if(this.keys.up.isDown) {
            if(!this.up.down) this.up.active = true;
            this.up.down = true;
        } else if(!this.keys.up.isDown) {
            this.up.active = false;
            this.up.down = false;
        }

        if(this.spaceBar.isDown) {
            if(!this.spaceBar.down) this.spaceBar.active = true;
            this.spaceBar.down = true;
        } else if(!this.spaceBar.isDown) {
            this.spaceBar.active = false;
            this.spaceBar.down = false;
        }

        if(this.keyP.isDown) {
            if(!this.pause.down) this.pause.active = true;
            this.pause.down = true;
        } else if(!this.keyP.isDown) {
            this.pause.active = false;
            this.pause.down = false;
        }

        if(this.keyR.isDown) {
            if(!this.restart.down) this.restart.active = true;
            this.restart.down = true;
        } else if(!this.keyR.isDown) {
            this.restart.active = false;
            this.restart.down = false;
        }

        if(this.keyE.isDown) {
            if(!this.grab.down) this.grab.active = true;
            this.grab.down = true;
        } else if(!this.keyE.isDown) {
            this.grab.active = false;
            this.grab.down = false;
        }
    }

}

class Key {
    constructor() {
        this.active = false;
        this.down = false;
    }
}