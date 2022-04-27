class Trap extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.body.allowGravity = true;

        this.trapSpeed = game.settings.worldSpeed;
    }

    update() {
        this.onGround = this.body.touching.down;

        if (this.onGround) {
            this.x -= this.trapSpeed;
        }
        

    }
    
    activate() {
        this.play({ key: 'trapActive' });
    }
    
} 