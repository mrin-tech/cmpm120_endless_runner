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
        this.load.spritesheet('bearTrap', 'assets/Traps/Bear-Trap-Set-Sheet.png', {
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
        this.load.spritesheet('jumping', 'assets/Player-Sprites/Player1-Jump2(R)-Sheet.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.image('enemy_img', './assets/Traps/cigar_bomb.png');
    }

    create() {
        // hiding mouse
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

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

        // ADDING INVENTORY SLOTS
        this.inventory = this.add.image(game.config.width, game.config.height, 'inventory').setScale(4).setOrigin(1,1);
        this.inventory.x -= this.inventory.width;
        this.inventory.y -= this.inventory.height;
        this.invTrap = this.add.image(this.inventory.x - this.inventory.width * 2.25, this.inventory.y - 15, 'bearTrap', 1).setOrigin(1,1).setScale(3);

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
            // fillAlpha: 100,
            // isStroked: true,
            // lineWidth: 0
        //}).setOrigin(1,1).setScale(4);



        this.selectedTrap = true;
        this.selectedOther = false;
        
        
        //score
         // initialize score
         this.p1Score = '0000000';

         // display score
         let scoreConfig = {
             fontFamily: 'INVASION2000',
             fontSize: '45px',
             backgroundColor: '#564141',
             color: '#FFFFFF',
             align: 'left',
             padding: {
                 top: 5,
                 bottom: 5,
             },
             fixedWidth: 170
         }
         this.score = this.add.text(borderUISize + borderPadding*30, borderUISize + borderPadding*0.1, this.p1Score, scoreConfig);
        
         //Score Increase
        this.time.addEvent({
            delay: 75,
            callback: ()=>{
                if (this.p1Score < 999999) {
                     this.p1Score = Number(this.p1Score) + Number(1)
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
                start: 1,
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
        

        // player 1 keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // MOUSE CONTROLS
            // Trap selection
        this.inv1.setInteractive();
        this.inv1.on('pointerdown', function (pointer) {
            this.selectedTrap = true;
            this.selectedOther = false;
        }, this);
            // other selection
        this.inv2.setInteractive();
        this.inv2.on('pointerdown', function (pointer) {
            console.log('on inv2');
            this.selectedTrap = false;
            this.selectedOther = true;
        }, this);

        this.input.on('pointerdown', function (pointer) {
            console.log('mouse1');

            if (this.selectedTrap == true) {
                console.log('placing trap');
                this.trapp = this.spawnTrap(pointer.x, pointer.y);
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

        // total distance travelled by runner
        this.gameTotalDistance = 0;
        this.displayDist = this.add.text(20, 20, this.formatDist(this.gameTotalDistance), txtConfig);
        this.timedEvent = this.time.addEvent
        (
            {delay: 1000,
            callback: () => {this.gameTotalDistance += 1000; this.displayDist.text = this.formatDist(this.gameTotalDistance);}, scope: this, loop: true
            }
        );

        // PLATFORM GROUP
        this.counter = 500;
        this.enemyCounter = 700;
        this.platformGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.platformGroup.runChildUpdate = true;
        this.physics.add.collider(this.runner, this.platformGroup);
        let generate = this.time.addEvent({ delay: 200, callback: () =>{
            this.platformGenerate();
        },  loop: true });

        // BEAR TRAP GROUP
        this.trapGroup = this.physics.add.group();
        this.trapGroup.runChildUpdate = true;
        // this.physics.add.collider(this.runner, this.trapGroup);
        this.physics.add.collider(this.platformGroup, this.trapGroup);
        this.physics.add.overlap(this.runner, this.trapGroup, this.trapActivate, null, this);

        // generate enemy that is not part of the inventory
        this.enemyGroup = this.physics.add.group( {allowGravity: false, immovable: true } );
        this.enemyGroup.runChildUpdate = true;
        // this.physics.add.collider(this.runner, this.enemyGroup);
        let generateEnemy = this.time.addEvent({ delay: 200, callback: () =>{
            this.enemyGenerate();
        },  loop: true });

        this.physics.add.collider(this.runner, this.enemyGroup).active = false;
        this.physics.add.overlap(this.runner, this.enemyGroup, this.fallActivate, null, this);
        // this.physics.add.collider(this.runner, this.enemyGroup).active = false;


        this.gameOver = false;


        // adding cursor sprite
        this.cursor = this.add.sprite(-100, -100, 'cursor').setOrigin(0,0).setScale(0.75, 0.75);
    }

    update() {
        this.inventory.setDepth(0.5);
        this.invTrap.setDepth(0.5);
        this.inv1.setDepth(0.5);
        this.inv2.setDepth(0.5);
        this.inv1Highlight.setDepth(0.5);
        this.inv2Highlight.setDepth(0.5);
        this.cursor.setDepth(0.5);
        // console.log(this.cursor.depth);

        if (this.runner.dead == true) {
            this.gameOver = true;
            this.scene.start('gameOverScene');
        }


        console.log('Health: ' + this.runner.hearts);

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
            if(platform.x + (platform.width*2) < 0) {
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);


        if (this.touchFlag==true) {
            console.log('touch flag is true');
            this.DelayDeath();
            
            this.touchFlag = false;
        }
        else {
            console.log('touch flag is false');
        }


        // delete enemies that move out of frame
        this.enemyGroup.getChildren().forEach(function(enemy){
            if(enemy.y > 600) {
                this.enemyGroup.killAndHide(enemy);
                this.enemyGroup.remove(enemy);
            }
        }, this);

        // Check Mouse Location





        this.platform0.x -= 7;

        this.enemyGroup.getChildren().forEach(function(enemy) {
            this.allowGravity = true;
          }, this);

        // Moving Backgrounds
        this.sky.tilePositionX += 0.05;
        this.clouds.tilePositionX += 0.5;

        if (this.runner.y > 800) {
            console.log('abc');
            this.gameOver = true;
            this.scene.start('gameOverScene'); 
        }


        console.log(this.selectedTrap);
        // console.log(game.settings.worldSpeed);
        // console.log('Number of platforms: ' + this.plats);

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
        

        if (this.gameOver == false) {
            this.runner.update();
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
        this.newEnemy.setSize(16, 500);

        // this.physics.add.collider(this.runner, this.newEnemy);
        this.enemyGroup.add(this.newEnemy);
        this.enemyCounter += Phaser.Math.Between(900,2000);

    }

    spawnTrap(pointerx, pointery) {
        this.newTrap = new Trap(this, pointerx, pointery, 'bearTrap', 2).setScale(2.5);
        this.trapGroup.add(this.newTrap);
    }

    fallActivate(sprite, enemy) {
        this.touchFlag = true;
        enemy.fall();

        
    }

    trapActivate(sprite, trap)  {
        if (trap.animated != true) {
            trap.activate();
            trap.animated = true;
            this.runner.hurt();
            this.cameras.main.shake(100);
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
}
