class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.runner = this.add.rectangle(0,0,80,160);
    }

    update() {

    }
}
