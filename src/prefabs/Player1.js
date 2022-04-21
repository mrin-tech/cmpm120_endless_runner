class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 3;
        this.jumps = 0;
        this.Jumping = false;
    }

    create() {
        player.setBounce(0.5);
        player.setCollideWorldBounds(true);
    }

    update() {
        // add player core mechanics

        // running
        if(keyA.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
            this.x += this.moveSpeed;
        }

        // sliding
        
        // jumping
        this.onGround = this.body.touching.down;        //checks if player is standing on solid ground
        if (this.onGround) {            //reset the jump counter when on the ground
            this.jumps = 0;
        }

        if (Phaser.Input.Keyboard.JustDown(keyW) && (this.onGround || this.jumps < 2)) {        //checks if the runner can jump
            this.setVelocityY(-200);        // the jump
            this.jumps += 1;
        }
        
    }
}
