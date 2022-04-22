class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 8;
        this.jumps = 0;
        this.Jumping = false;
        this.Running = false;
        this.idleLooping = false;
        this.runLooping = false;
        this.jumpLooping = false;
    }

    preload() {
        // this.load.spritesheet('runner', 'assets/Player-Sprites/idle-run-temp.png', {
        //     frameWidth: 32,
        //     frameHeight: 32
        // });
    }

    create() {
        player.setBounce(0.5);
        player.setCollideWorldBounds(true);
        
    }

    update() {
        // add player core mechanics
        this.onGround = this.body.touching.down;        //checks if player is standing on solid ground
        // console.log('onGround' + this.onGround);
        // console.log(this.Running);
        // console.log('jumping ' + this.Jumping);
        //standing
        //checking when to end jumping anim
        if (this.onGround == true) {
            this.Jumping = false;
            this.jumpLooping = false;
        }

        if (this.Jumping == true && this.jumpLooping == false) {
            this.play({ key: 'jump' });
            this.jumpLooping = true;
        }
        // checking when to play idle anim
        if (this.onGround && this.Running == false && this.idleLooping == false) {
            this.play({ key: 'idle' });
            console.log('idle');
            this.idleLooping = true;
        }
        // checking when to play running anim
        if (this.Running && this.onGround && this.runLooping == false) {
            this.play({ key: 'run' });
            this.runLooping = true;
        }

        //changing look direction
        if (keyA.isDown) {
            this.flipX = true;
        }
        if (keyD.isDown) {
            this.flipX = false;
        }

        // running
        if(keyA.isDown || keyD.isDown) {
            if(keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
                this.flipX = true;
                this.Running = true;
                this.idleLooping = false;
            }
            if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
                this.flipX = false;
                this.Running = true;
                this.idleLooping = false;
            }
        }
        else {
            this.Running = false;
            this.runLooping = false;
        }

        // sliding
        
        // jumping
        if (this.onGround) {            //reset the jump counter when on the ground
            this.jumps = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(keyW) && (this.onGround || this.jumps < 2)) {        //checks if the runner can jump
            this.setVelocityY(-200);        // the jump
            this.jumps += 1;
            this.Jumping = true;
        }
        
    }
}
