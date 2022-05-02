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
        this.load.image('cursor', './assets/cursor.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('zeplin', './assets/Zeplin.png');
        this.load.spritesheet('bearTrap', 'assets/Traps/Bear-Trap-Set-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('cannonBall', 'assets/Traps/Bomb-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('cooldown', 'assets/Traps/Cooldown-Sheet.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('runner', 'assets/Player-Sprites/idle-run-temp.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('block1', './assets/Level-Design/Platform-Block (1).png');
        this.load.image('block2', './assets/Level-Design/Platform-Block (2).png');
        this.load.image('block3', './assets/Level-Design/Platform-Block (3).png');
        this.load.image('block4', './assets/Level-Design/Platform-Block (4).png');
        this.load.image('inventory', './assets/Traps/Inventory.png');
        this.load.spritesheet('jumping', 'assets/Player-Sprites/Player1-Jump(R)-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('jumping2', 'assets/Player-Sprites/Player1-Jump2(R)-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('enemy_img', './assets/Traps/cigar_bomb.png');

        this.load.atlas('flares', './assets/flares.png', './assets/flares.json');
        this.load.image('smoke', './assets/Traps/smoke_particle.png');

    }

    create() {
        this.highScore=0;
        // hiding mouse
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        // setting up camera
        const controlConfig = {
            camera: this.cameras.main
        }
        this.camera = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        // remove context menu on right click
        this.input.mouse.disableContextMenu();

        this.plats = 0;     // number of platforms generated
        this.e = 0;         // number of enemies generated

        // ADDING BACKGROUND
        this.sky = this.add.tileSprite(0,0, game.config.width*1.2, game.config.height*1.2, 'sky').setOrigin(0,0).setScale(1);
        this.clouds = this.add.tileSprite(0,0, game.config.width*1.2, game.config.height*1.2, 'clouds').setOrigin(0,0).setScale(1);
        this.zeplin = this.add.tileSprite(0,0, game.config.width*1.2, game.config.height*1.2, 'zeplin').setOrigin(0,0).setScale(1);

        // ADDING INVENTORY SLOTS
        this.inventory = this.add.image(game.config.width, game.config.height, 'inventory').setScale(4).setOrigin(1,1);
        this.inventory.x -= this.inventory.width;
        this.inventory.y -= this.inventory.height;
        this.invTrap = this.add.image(this.inventory.x - this.inventory.width * 2.25, this.inventory.y - 15, 'bearTrap', 3).setOrigin(1,1).setScale(3);
        this.invCool = this.add.sprite(this.inventory.x - this.inventory.width * 2.25, this.inventory.y - 5, 'cooldown', 0).setOrigin(1,1).setScale(3);
        this.invCool.alpha = 0;
        this.invBomb = this.add.image(this.inventory.x - 10, this.inventory.y - 5, 'cannonBall', 0).setOrigin(1,1).setScale(3);
        this.invCool2 = this.add.sprite(this.inventory.x - 10, this.inventory.y - 5, 'cooldown', 0).setOrigin(1,1).setScale(3);
        this.invCool2.alpha = 0;
        

        this.inv2 = this.add.rectangle(this.inventory.x, this.inventory.y, this.inventory.width/2, this.inventory.height, 0xFF0000).setOrigin(1,1).setScale(4);
        this.inv1 = this.add.rectangle(this.inventory.x - this.inventory.width * 2, this.inventory.y, this.inventory.width/2, this.inventory.height, 0x2200FF).setOrigin(1,1).setScale(4);
        this.inv2.alpha = 0.01;
        this.inv1.alpha = 0.01;
        this.inv1Highlight = this.add.rectangle(this.inventory.x - this.inventory.width * 2, this.inventory.y, this.inventory.width/2, this.inventory.height, 0x22FF00, 0).setOrigin(1,1).setScale(4);
        this.inv1Highlight.isStroked = true;
        this.inv1Highlight.lineWidth = 2;
        this.inv1Highlight.strokeColor = 0xFDFF9C;

        this.inv2Highlight = this.add.rectangle(this.inventory.x, this.inventory.y, this.inventory.width/2, this.inventory.height, 0x22FF00, 0).setOrigin(1,1).setScale(4);
        this.inv2Highlight.isStroked = true;
        this.inv2Highlight.lineWidth = 2;
        this.inv2Highlight.strokeColor = 0xFDFF9C;

        // pause menu text configuration
        let menuConfig = {
            fontFamily: 'INVASION2000',
            fontSize: '20px',
            backgroundColor: '#637a68',
            color: '#dddace',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            },
        }
        menuConfig.fontSize = '50px';
        // this.pauseText = this.add.text(game.config.width/2, 180, 'PAUSED', menuConfig).setOrigin(0.5);
        // this.pauseText.alpha = 0;

        // this.highScoreText = this.add.text(80, 80, this.highScore, menuConfig).setOrigin(0.5);
        // this.newHighScoreText = this.add.text(80, 160, 'HighScore: ', menuConfig).setOrigin(0.5);

        this.selectedTrap = true;
        this.selectedOther = false;

        
        
        //score
         // initialize score
         this.p1Score = '0000000';

         // display score
         let scoreConfig = {
             fontFamily: 'INVASION2000',
             fontSize: '45px',
             //backgroundColor: '#564141',
             color: '#FFFFFF',
             align: 'left',
             padding: {
                 top: 5,
                 bottom: 5,
             },
             fixedWidth: 200
         }
        
        this.scoreText = this.add.text(game.config.width/2 - 80, 0, 'Score:', scoreConfig);
        this.score = this.add.text(game.config.width/2 + 100, 0, this.p1Score, scoreConfig);
        // this.localHighScore = this.highScore;
        this.highScoreText = this.add.text(120, 40, globalHighScore, scoreConfig).setOrigin(0.5);
        scoreConfig.fontSize = '20px';
        this.newHighScoreText = this.add.text(120, 20, 'HighScore: ', scoreConfig).setOrigin(0.5);


        // Initialize Cooldowns
        this.bearTrapMax = 250;
        this.cannonBombMax = 350;
        this.bearTrapCooldown = this.bearTrapMax;
        this.cannonBombCooldown = this.cannonBombMax;
        
        
         //Score Increase
        this.time.addEvent({
            delay: 75,
            callback: ()=>{
                if (this.p1Score < 999999) {
                    this.p1Score = Number(this.p1Score) + Number(1)
                    // if (this.p1Score > this.highScore) this.highScore = this.p1Score;
                    this.score.text = this.p1Score
                }
            },
            loop: true
        })

        
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
            //repeat: -1
        });

        const runnerJump2 = this.anims.create({
            key: 'jump2',
            frames: this.anims.generateFrameNames('jumping2', {
                start: 3,
                end: 7
            }),
            frameRate: 12,
            //repeat: -1
        });

        const bearTrapActive = this.anims.create({
            key: 'trapActive',
            frames: this.anims.generateFrameNames('bearTrap', {
                start: 2,
                end: 4
            }),
            frameRate: 18,
        });

        const cooldownActive = this.anims.create({
            key: 'cooldownActive',
            frames: this.anims.generateFrameNames('cooldown', {
                start: 0,
                end: 16
            }),
            frameRate: 4,
        });

        const cooldownActive2 = this.anims.create({
            key: 'cooldownActive2',
            frames: this.anims.generateFrameNames('cooldown', {
                start: 0,
                end: 16
            }),
            frameRate: 3,
        });

        const cannonBallActive = this.anims.create({
            key: 'cannonActive',
            frames: this.anims.generateFrameNames('cannonBall', {
                start: 1,
                end: 3
            }),
            frameRate: 14,
        });

        // HEARTS //
        // this.heartsImg = this.add.image(1000, 40, 'heart').setScale(1.5);

        // temporary sprites //
        this.runner = new Player1(this, game.config.width/3, 500, 'temp').setScale(4).setOrigin(0.5, 1)
        .setSize(20, 24)
        .setOffset(8, 8);

        // creating platform group
        this.platforms = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.physics.add.collider(this.runner, this.platforms);


            //spawning platforms
        this.platform0 = this.platforms.create(400, 600, 'platform0').setScale(6).refreshBody();
        //this.movingContainer.add([platform0]);
        
        // DEBUG PLATFORM
        // this.platform0 = this.platforms.create(600, 600, 'platform0').setScale(6).refreshBody();

        // player 1 keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // MOUSE CONTROLS
            // Trap selection
        this.inv1.setInteractive();
        this.inv1.on('pointerdown', function (pointer) {
            this.bearTrapCooldown -= 1;
            this.selectedTrap = true;
            this.selectedOther = false;
        }, this);
            // other selection
        this.inv2.setInteractive();
        this.inv2.on('pointerdown', function (pointer) {
            this.cannonBombCooldown -= 1;
            this.selectedTrap = false;
            this.selectedOther = true;
        }, this);

        this.input.on('pointerdown', function (pointer) {
            //console.log('mouse1');

            if (this.selectedTrap == true && this.bearTrapCooldown >= this.bearTrapMax && this.cursor.x > 500) {
                //console.log('placing trap');
                this.trapp = this.spawnTrap(pointer.x, pointer.y);
                this.bearTrapCooldown = 0;
                this.invCool.alpha = 1;
                this.invCool.play({ key: 'cooldownActive' });
            }
            else if (this.selectedOther == true && this.cannonBombCooldown >= this.cannonBombMax) {
                //console.log('firing cannon');
                this.cannonBall = this.spawnCannonBall(pointer.y);
                this.cannonBombCooldown = 0;
                this.invCool2.alpha = 1;
                this.invCool2.play({ key: 'cooldownActive2' });
                this.sound.play('fire');
            }
        }, this);

        let txtConfig =
        {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#cdbbbc',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 50
        };

        // PLATFORM GROUP
        this.counter = 500;
        this.enemyCounter = 700;
        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.platformGroup.runChildUpdate = true;
        this.physics.add.collider(this.runner, this.platformGroup);
        let generate = this.time.addEvent({ delay: 300, callback: () =>{
            this.platformGenerate();
        },  loop: true });

        // BEAR TRAP GROUP
        this.trapGroup = this.physics.add.group();
        this.trapGroup.runChildUpdate = true;
        // this.physics.add.collider(this.runner, this.trapGroup);
        this.physics.add.collider(this.platformGroup, this.trapGroup);
        this.physics.add.overlap(this.runner, this.trapGroup, this.trapActivate, null, this);

        // CANNONBALL GROUP
        this.cannonGroup = this.physics.add.group({allowGravity: false, immovable: true});
        this.cannonGroup.runChildUpdate = true;
        this.physics.add.overlap(this.runner, this.cannonGroup, this.cannonActivate, null, this);


        // generate enemy that is not part of the inventory
        this.enemyGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.enemyGroup.runChildUpdate = true;
        // this.physics.add.collider(this.runner, this.enemyGroup);
        let generateEnemy = this.time.addEvent({ delay: 1000, callback: () =>{
            this.enemyGenerate();
        },  loop: true });

        //this.physics.add.collider(this.runner, this.enemyGroup).active = false;
        this.physics.add.overlap(this.runner, this.enemyGroup, this.fallActivate, null, this);
        this.physics.add.overlap(this.platformGroup, this.enemyGroup, this.fallActivate2, null, this);
        // this.physics.add.collider(this.runner, this.enemyGroup).active = false;


        this.gameOver = false;


        // adding cursor sprite
        this.cursor = this.add.sprite(-100, -100, 'cursor').setOrigin(0,0).setScale(0.75, 0.75);
        this.bearTrapPre = this.add.image(-100, -100, 'bearTrap', 0).setOrigin(0.5,0.5).setScale(2.5);
        this.bearTrapPre.alpha = 0;
        this.bearTrapPre.tint = 0xF7FF00;

        this.cannonPre = this.add.image(-100, -100, 'cannonBall', 0).setOrigin(0,0.5).setScale(2.5);
        this.cannonPre.alpha = 0;
        this.bearTrapPre.tint = 0xF7FF00;

        this.heartImg1 = this.add.image(1050, 40, 'heart').setScale(1.5);
        this.heartImg2 = this.add.image(1000, 40, 'heart').setScale(1.5);
        this.heartImg3 = this.add.image(950, 40, 'heart').setScale(1.5);
        
        // this.displayHearts(this.runner.hearts);
        // Launch Pause Scene
        this.scene.launch('pauseScene');
    }

    update() {
        if (this.runner.hearts == 2) {
            this.heartImg3.destroy();            
        }
        if (this.runner.hearts == 1) {
            this.heartImg2.destroy();            
        }
        if (this.runner.hearts == 0) {
            this.heartImg1.destroy();            
        }


        // this.displayHearts(this.runner.hearts);

        this.heartImg1.setDepth(0.5);
        this.heartImg2.setDepth(0.5);
        this.heartImg3.setDepth(0.5);
        this.inventory.setDepth(0.5);
        this.invTrap.setDepth(0.5);
        this.invBomb.setDepth(0.5);
        this.invCool.setDepth(0.5);
        this.invCool2.setDepth(0.5);
        this.inv1.setDepth(0.5);
        this.inv2.setDepth(0.5);
        this.inv1Highlight.setDepth(0.5);
        this.inv2Highlight.setDepth(0.5);
        this.cursor.setDepth(0.5);
        // console.log(this.cursor.depth);

        if (this.runner.dead == true || this.runner.y > 800) {
            this.gameOver = true;
            globalHighScore = this.highScore;
            this.scene.start('gameOverScene');
            
        }

        // if (Phaser.Input.Keyboard.JustDown(keyESC)) {
        //     game.paused = true;
        //     console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA'+game.paused)
        //     this.pauseText.alpha = 0.8;
        //     this.scene.pause();
        //     this.scene.launch('pauseScene');
        //     this.pauseText.alpha = 0;
        //     game.paused = false;
        // }


        // see where traps will be
        if (this.selectedTrap == true) {
            this.bearTrapPre.alpha = 0.5;
        } else {
            this.bearTrapPre.alpha = 0;
        }

        if (this.selectedOther == true) {
            this.cannonPre.alpha = 0.5;
        } else {
            this.cannonPre.alpha = 0;
        }

        // update where highlight trap is
        this.bearTrapPre.x = game.input.mousePointer.x;
        this.bearTrapPre.y = game.input.mousePointer.y + 10;

        this.cannonPre.x = game.config.width - 20;
        this.cannonPre.y = game.input.mousePointer.y;

        // tracking trap cooldown and removing cooldown image
        if (this.bearTrapCooldown >= this.bearTrapMax) {
            this.invCool.alpha = 0;
        } else {
            this.bearTrapCooldown += 1;
        }
        if (this.cannonBombCooldown >= this.cannonBombMax) {
            this.invCool2.alpha = 0;
        } else {
            this.cannonBombCooldown += 1;
        }

        // console.log("trap cool " + this.bearTrapCooldown);
        // console.log('Health: ' + this.runner.hearts);

        // updating mouse cursor sprite position
        this.cursor.x = game.input.mousePointer.x - 1;
        this.cursor.y = game.input.mousePointer.y + 1;
        
        // Inventory Highlight Appearance
        if (this.selectedTrap == true) {
            this.inv1Highlight.alpha = 100;
        } else {
            this.inv1Highlight.alpha = 0;
        }

        if (this.selectedOther == true) {
            this.inv2Highlight.alpha = 100;
        } else {
            this.inv2Highlight.alpha = 0;
        }
        // delete platforms that move out of frame
        this.platformGroup.getChildren().forEach(function(platform){
            if(platform.x + (platform.width*2) < -100) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);


        if (this.touchFlag==true) {
            this.DelayDeath();
            this.touchFlag = false;
        }


        // delete enemies that move out of frame
        this.enemyGroup.getChildren().forEach(function(enemy){
            if(enemy.y > 600 || enemy.x < -100) {
                this.enemyGroup.killAndHide(enemy);
                this.enemyGroup.remove(enemy);
                //console.log('KILLED ENEMY -----------------------------------------');
            }
            if(enemy.x > this.runner.x - 100 && enemy.x < this.runner.x + 100) {
                enemy.fall();
                //console.log('FALLING ENEMY');
            }
            if(enemy.hit == true) {
                enemy.body.setVelocity(0,0);
            }
        }, this);
        

        this.platform0.x -= 7;

        this.enemyGroup.getChildren().forEach(function(enemy) {
            this.allowGravity = true;
        }, this);

        // Moving Backgrounds
        this.sky.tilePositionX += 0.05;
        this.clouds.tilePositionX += 0.5;
        this.zeplin.tilePositionX += 1;


        //console.log(this.selectedTrap);

        if (this.gameOver == false) {
            this.runner.update();
            if (this.p1Score >= globalHighScore) {
                this.highScore = this.p1Score;
                this.highScoreText.text = this.highScore;
                this.newHighScoreText.text = 'New High Score!';
                //console.log(this.highScore, this.p1Score, globalHighScore);
            }
            if (globalHighScore > this.p1Score) {
                this.highScore = globalHighScore;
                this.highScoreText.text = globalHighScore;
            }
            //this.trapp.update();
        }
    }

    formatDist(ms) {

        let sec = ms/1000;
        return `${sec}`;

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


    platformGenerate() {
        // platformGroup.add(this.createPlatform(Phaser.Math.Between(430,1000),Phaser.Math.Between(430,600)));
        this.newPlatform = new Platform(this, this.counter + this.runner.x, Phaser.Math.Between(400,600),  'platform0', 0).setOrigin(0,0).setScale(2);
        this.plats += 1;
        // console.log(this.newPlatform.x);
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

        this.e+=1;
        this.newEnemy.name = "num" + this.e;
        
        // trying to find absolute position of enemy 
        // console.log(this.enemyCounter, this.runner.x, this.newEnemy.x, this.newEnemy.y, this.e);
        this.absVal = this.newEnemy.x-game.settings.worldSpeed - this.enemyCounter;
        this.newEnemy.absPos = this.absVal;
        this.newEnemy.allowGravity = true;
        this.newEnemy.setSize(16, 40);

        // this.physics.add.collider(this.runner, this.newEnemy);
        this.enemyGroup.add(this.newEnemy);
        this.enemyCounter += Phaser.Math.Between(900,2000);
    }


    spawnTrap(pointerx, pointery) {
        this.newTrap = new Trap(this, pointerx, pointery, 'bearTrap', 0).setScale(2.5);
        this.trapGroup.add(this.newTrap);
    }

    spawnCannonBall(pointery) {
        this.newCannon = new CannonBall(this, 1200, pointery, 'cannonBall', 0).setScale(2.5);
        this.cannonGroup.add(this.newCannon);

        this.particles = this.add.particles('smoke');

        this.partTrail = this.particles.createEmitter({
            // frame: 'yellow',
            radial: false,
            // x: this.newCannon.x + 100,
            // y: this.newCannon.y,
            lifespan: 2000,
            speedX: { min: -200, max: -400 },
            quantity: 4,
            gravityY: -50,
            scale: { start: 3, end: 0, ease: 'Power3' },
            blendMode: 'ADD',
            
            follow: this.newCannon,
            followOffset: {
                   x: 20,
                },
        });
    }

    // Explode Bomb on contact
    fallActivate(sprite, enemy) {
        if (enemy.hit != true) {
            enemy.hit = true;
            this.sound.play('explode');
            //this.touchFlag = true;
            this.runner.hurt();
            this.cameras.main.shake(100);
            enemy.body.allowGravity = false;
            enemy.body.setVelocity(0, 0);
            enemy.alpha = 0;

            this.expParticles2 = this.add.particles('smoke');
            this.partEm2 = this.expParticles2.createEmitter({
                radial: true,
                // x: this.newCannon.x + 100,
                // y: this.newCannon.y,
                lifespan: 1400,
                speed: { min: 100, max: 300 },
                quantity: 30,
                scale: { start: 4, end: 0, ease: 'Power3' },
                blendMode: 'ADD',
                follow: enemy
            });
            let explodeStop = this.time.addEvent({ delay: 200, callback: () =>{
                this.stopExplode();
            }});
            let explode3 = this.time.addEvent({ delay: 3000, callback: () =>{
                this.deleteParticlesFall();
            }});
        }
    }

    fallActivate2(sprite, enemy) {
        if (enemy.hit != true) {
            enemy.hit = true;
            this.sound.play('explode');
            
            this.cameras.main.shake(50);
            enemy.body.allowGravity = false;
            enemy.body.setVelocity(0, 0);
            enemy.alpha = 0;

            this.expParticles2 = this.add.particles('smoke');
            this.partEm2 = this.expParticles2.createEmitter({
                angle: {min: -45, max: -135},
                // x: this.newCannon.x + 100,
                // y: this.newCannon.y,
                lifespan: 1400,
                speed: { min: 100, max: 700 },
                quantity: 30,
                scale: { start: 4, end: 0, ease: 'Power3' },
                blendMode: 'ADD',
                follow: enemy,
                followOffset: new Phaser.Math.Vector2(0, 50)
            });
            let explodeStop = this.time.addEvent({ delay: 200, callback: () =>{
                this.stopExplode();
            }});
            let explode3 = this.time.addEvent({ delay: 1000, callback: () =>{
                this.deleteParticlesFall();
            }});
        }
    }

    trapActivate(sprite, trap)  {
        if (trap.onGround == true) {
            if (trap.animated != true) {
                trap.activate();
                trap.animated = true;
                this.runner.hurt();
                this.cameras.main.shake(100);
                this.sound.play('trapClose');
            }
        }
    }

    cannonActivate(sprite, cannon) {
        if (cannon.animated != true) {
            cannon.activate();
            cannon.animated = true;
            this.runner.hurt();
            this.cameras.main.shake(100);
            this.sound.play('explode');

            this.expParticles = this.add.particles('smoke');
            this.partEm = this.expParticles.createEmitter({
                // frame: 'yellow',
                radial: true,
                // x: this.newCannon.x + 100,
                // y: this.newCannon.y,
                lifespan: 1200,
                speed: { min: 100, max: 600 },
                quantity: 30,
                gravityY: 10,
                scale: { start: 4, end: 0, ease: 'Power3' },
                blendMode: 'ADD',
                
                follow: this.newCannon
            });
            let explode1 = this.time.addEvent({ delay: 200, callback: () =>{
                this.deleteCannon();
            }});
            let explode2 = this.time.addEvent({ delay: 3000, callback: () =>{
                this.deleteParticles();
            }});
        }
    }

    DelayDeath() {
        let t = 2000;
        this.hitEnemyBomb = this.time.addEvent({ delay: t, callback: () =>{
            if (this.touchFlag == true) {
                this.runner.hurt();
            }
            
        },  loop: true });
    }

    deleteCannon() {
        this.newCannon.alpha = 0;
        this.partTrail.on = false;
        this.partEm.on = false;
    }

    deleteParticles() {
        this.particles.destroy();
        this.expParticles.destroy();
        this.newCannon.delete();
    }

    deleteTrailParticles() {
        this.particles.destroy();
    }

    deleteParticlesFall() {
        this.expParticles2.destroy();
        this.newEnemy.destroy();
    }

    stopExplode() {
        this.partEm2.on = false;
    }


}
