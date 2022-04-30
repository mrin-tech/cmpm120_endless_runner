class CannonBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.body.allowGravity = false;
        this.ballSpeed = game.settings.worldSpeed * 1.5;
    }

    update() {
        this.x -= this.ballSpeed;
        

    }
    
    activate() {
        this.play({ key: 'cannonActive' });
    }
    
} 