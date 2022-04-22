class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // temporary images for sprite
        this.load.image('temp', './assets/temp32.png');
        this.load.image('ground', './assets/temp_ground.png');
        this.load.spritesheet('runner', 'assets/Player-Sprites/idle-run-temp.png', {
            frameWidth: 32,
            frameHeight: 32
        });
    }

    create() {
        //  this.runner = this.add.rectangle(game.config.width / 2, game.config.height* 3 / 4, 80, 160, 0xFFFFFF);

        //ANIMATIONS
        const runnerIdle = this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('runner', {
                start: 0,
                end: 1
            }),
            frameRate: 2,
            repeat: -1
        });

        const runnerRun = this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('runner', {
                start: 10,
                end: 17
            }),
            frameRate: 12,
            repeat: -1
        });

        // temporary sprites //
        //this.runner1 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding, 'runner').setScale(4).setOrigin(0.5, 1);

        this.runner = new Player1(this, game.config.width/3, game.config.height - 2 *borderUISize - borderPadding, 'temp').setScale(4).setOrigin(0.5, 0.5);
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
