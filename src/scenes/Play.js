class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // temporary images for sprite
        this.load.image('temp', './assets/temp.png');
        this.load.image('ground', './assets/temp_ground.png');
        this.load.spritesheet('runner', 'assets/Player-Sprites/idle-run-temp.png');
    }

    create() {
        //  this.runner = this.add.rectangle(game.config.width / 2, game.config.height* 3 / 4, 80, 160, 0xFFFFFF);

        // temporary sprites //
        this.runner = new Player1(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'temp').setOrigin(0.5, 0);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 630, 'ground').setScale(2).refreshBody();
        this.physics.add.collider(this.runner, this.platforms);
        // //


        // player 1 keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        this.runner.update();
            //////
        
    }
}
