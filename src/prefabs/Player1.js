class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 3;

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
        if (keyW.isDown) {
            this.setVelocityY(-200);
        }

        // double jump
    }
}
