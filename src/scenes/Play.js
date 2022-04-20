class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        this.runner = this.add.rectangle(game.config.width / 2, game.config.height* 3 / 4, 80, 160, 0xFFFFFF);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
            ////
    }
}
