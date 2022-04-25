class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // temporary images for sprite
        this.load.image('temp', './assets/temp32.png');
        this.load.image('ground', './assets/temp_ground.png');
        this.load.image('platform0', './assets/platform0.png');
        this.load.image('sky', './assets/sky.png');
        this.load.image('clouds', './assets/clouds.png');
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
        this.load.image('enemy_img', './assets/temp2.png');
    }

    create() {
        this.plats = 0;     // number of platforms generated

        // ADDING BACKGROUND
        this.sky = this.add.tileSprite(0,0, game.config.width, game.config.height, 'sky').setOrigin(0,0).setScale(1);
        this.clouds = this.add.tileSprite(0,0, game.config.width, game.config.height, 'clouds').setOrigin(0,0).setScale(1);

        //ANIMATIONS
        const runnerIdle = this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('runner', {
                start: 10,
                end: 17
            }),
            frameRate: 10,
            repeat: -1
        });

        const runnerRun = this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('runner', {
                start: 10,
                end: 17
            }),
            frameRate: 16,
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
        //this.movingContainer = this.add.container();

        // temporary sprites //
        //this.runner1 = this.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding, 'runner').setScale(4).setOrigin(0.5, 1);
            //runner
        this.runner = new Player1(this, game.config.width/3, 500, 'temp').setScale(4).setOrigin(0.5, 1);

        // creating platform group
        this.platforms = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.runner, this.platforms);


            //spawning platforms
        this.platform0 = this.platforms.create(400, 600, 'platform0').setScale(6).refreshBody();
        //this.movingContainer.add([platform0]);
        
        
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
        // this.cameras.main.setSize(960, 610);
        // this.cameras.main.startFollow(this.runner);

        // ahhhhhhh //

        // this.p = new Platform(this, Phaser.Math.Between(430,1000),Phaser.Math.Between(450,600),  'platform0', 0).setOrigin(0,0).setScale(2);
        // this.physics.add.collider(this.runner, this.p);
        this.counter = 500;
        this.enemyCounter = 700;
        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.platformGroup.runChildUpdate = true;
        this.physics.add.collider(this.runner, this.platformGroup);
        let generate = this.time.addEvent({ delay: 200, callback: () =>{
            this.platformGenerate();
        },  loop: true });

        // generate enemy that is not part of the inventory
        // this.newEnemy = new Enemy(this, 430, 500,  'enemy_img', 0).setOrigin(0,0).setScale(2);
        this.enemyGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.enemyGroup.runChildUpdate = true;
        this.physics.add.collider(this.runner, this.enemyGroup);
        let generateEnemy = this.time.addEvent({ delay: 200, callback: () =>{
            this.enemyGenerate();
        },  loop: true });


        this.gameOver = false;
    }

    update() {
        // this.p.update(); 
        // console.log('y', this.runner.y);

        this.platform0.x -= 7;
        // this.newEnemy.x -= 7;

        // Moving Backgrounds
        this.sky.tilePositionX += 0.01;
        this.clouds.tilePositionX += 0.5;

        if (this.runner.y > 800) {
            console.log('abc');
            this.gameOver = true;
            this.scene.start('gameOverScene'); 
        }

        if (this.gameOver == false) {
            this.runner.update();
        }

        console.log(game.settings.worldSpeed);
        console.log('Number of platforms: ' + this.plats);

        // console.log('runner x position: ' + this.runner.x);

        //moving the world around player
        // if(keyA.isDown || keyD.isDown) {
        //     if(keyA.isDown && this.runner.x) {
        //         this.movingContainer.x += game.settings.worldSpeed;
        //         console.log('left');
        //     }
        //     if (keyD.isDown && this.runner.x) {
        //         this.movingContainer.x -= game.settings.worldSpeed;
        //         console.log('right');
        //     }
        // }
        
    }

    allowGrav(runner, enemy) {
        if (runner.y == enemy.y) return true;
        else return false
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


    platformGenerate(){
        // platformGroup.add(this.createPlatform(Phaser.Math.Between(430,1000),Phaser.Math.Between(430,600)));
        this.newPlatform = new Platform(this, this.counter + this.runner.x, Phaser.Math.Between(400,600),  'platform0', 0).setOrigin(0,0).setScale(2);
        this.plats += 1;
        console.log(this.newPlatform.x);
        this.physics.add.collider(this.runner, this.newPlatform);
        this.platformGroup.add(this.newPlatform);

        // this.platforms.add(this.newPlatform);

        //this.movingContainer.add(this.newPlatform);

        // these values can be changed to space out the platforms more to make the game more difficult
        // higher numbers = farther the platforms are spaced out
        this.counter += Phaser.Math.Between(275,600);
    }

    enemyGenerate(){
        this.newEnemy = new Enemy(this, this.enemyCounter + this.runner.x, 10,  'enemy_img', 0).setOrigin(0,0).setScale(2);
        this.physics.add.collider(this.runner, this.newEnemy);
        this.enemyGroup.add(this.newEnemy);
        this.enemyCounter += Phaser.Math.Between(900,2000);

    }
}
