class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // temporary images for sprite
        this.load.image('temp', './assets/temp32.png');
        this.load.image('ground', './assets/temp_ground.png');
        this.load.image('platform0', './assets/platform0.png');
        this.load.spritesheet('runner', 'assets/Player-Sprites/idle-run-temp.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('block1', './assets/Level-Design/Platform-Block (1).png');
        this.load.image('block2', './assets/Level-Design/Platform-Block (2).png');
        this.load.image('block3', './assets/Level-Design/Platform-Block (3).png');
        this.load.image('block4', './assets/Level-Design/Platform-Block (4).png');
        this.load.spritesheet('jumping', 'assets/Player-Sprites/Player1-Jump(R)-Sheet.png', {
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

        const runnerJump = this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('jumping', {
                start: 5,
                end: 12
            }),
            frameRate: 12,
            repeat: -1
        });
        // creating moving container
        this.movingContainer = this.add.container();

        // temporary sprites //
        //this.runner1 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding, 'runner').setScale(4).setOrigin(0.5, 1);
            //runner
        this.runner = new Player1(this, game.config.width/3, 500, 'temp').setScale(4).setOrigin(0.5, 1);

        // creating platform group
        this.platforms = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.runner, this.platforms);


            //spawning platforms
        const platform0 = this.platforms.create(400, 600, 'platform0').setScale(6).refreshBody();
        this.movingContainer.add([platform0]);

        console.log('yo');
        
        
        // //


        // player 1 keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // platform
        this.createPlatform(400, 500);
        this.createPlatform(630, 500);

        // camera
        this.cameras.main.setSize(960, 610);
        this.cameras.main.startFollow(this.runner);

    }

    // generate platforms through random blocks
    createPlatform(xVal, yVal) {
        this.grd = this.physics.add.group({
            key: Phaser.Math.RND.pick(['block1', 'block2', 'block3', 'block4']),
            repeat: 11,
            setXY: { x: xVal, y: yVal, stepX: 16 },
            immovable: true,
            allowGravity: false,
        });
        this.physics.add.collider(this.runner, this.grd);
    }


    update() {
        this.runner.update();
        

        //moving the world around player
        if(keyA.isDown || keyD.isDown) {
            if(keyA.isDown && this.runner.x) {
                this.movingContainer.x += game.settings.worldSpeed;
                console.log('left');
            }
            if (keyD.isDown && this.runner.x) {
                this.movingContainer.x -= game.settings.worldSpeed;
                console.log('right');
            }
        }
    }
}
