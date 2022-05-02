class CannonBall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.body.allowGravity = false;
        this.ballSpeed = game.settings.worldSpeed * 2;
    }

    update() {
        this.x -= this.ballSpeed;

        // delete when off screen
        if (this.x < -1000) {
            this.scene.deleteTrailParticles();
            this.delete();
        }

    }
    
    activate() {
        this.play({ key: 'cannonActive' });
    }

    delete() {
        this.destroy();
    }
    
} 