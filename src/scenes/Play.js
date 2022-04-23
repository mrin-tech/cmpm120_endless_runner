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

        // temporary sprites //
        //this.runner1 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding, 'runner').setScale(4).setOrigin(0.5, 1);

        this.runner = new Player1(this, game.config.width/3, 500, 'temp').setScale(4).setOrigin(0.5, 1);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 600, 'platform0').setScale(6).refreshBody();
        this.physics.add.collider(this.runner, this.platforms);
        // //


        // player 1 keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // // platform
        //this.createPlatform(400, 500);
        // this.createPlatform(630, 500);

        // camera
        this.cameras.main.setSize(960, 610);
        this.cameras.main.startFollow(this.runner);

        // ahhhhhhh //

        this.p = new Platform(this, Phaser.Math.Between(430,1000),Phaser.Math.Between(500,800), 'platform0', 0).setOrigin(0,0);
        this.physics.add.collider(this.runner, this.p);

        platformGroup = this.physics.add.group();
        platformGroup.defaults = {};
        platformGroup.runChildUpdate = true;
        this.physics.add.collider(this.runner, this.platformGroup);
        let spawn = this.time.addEvent({ delay: 1000, callback: () =>{
            this.platformSpawn();
        },  loop: true });

        
       

    }

    update() {
        this.runner.update();
        this.p.update();
        
    }

    // generate platforms through random blocks
    createPlatform(xVal, yVal) {
        // randomizes blocks to create a platform
        this.grd = this.physics.add.group({
            key: 'block1',
            repeat: Phaser.Math.Between(2, 10),
            setXY: { x: xVal, y: yVal, stepX: 16 },
            immovable: true,
            allowGravity: false,
            // velocityX: -200

        });
        // this.grd.setVelocityX(-200);
        // this.runner.setVelocityX(200);
        this.physics.add.collider(this.runner, this.grd);
    }

    platformSpawn(){
        // platformGroup.add(this.createPlatform(Phaser.Math.Between(430,1000),Phaser.Math.Between(430,600)));
        this.newPlatform = new Platform(this, Phaser.Math.Between(430,1000),Phaser.Math.Between(450,600),  'platform0', 0).setOrigin(0,0);
        this.physics.add.collider(this.runner, this.newPlatform);
        platformGroup.add(this.newPlatform);
    }

}
