class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        scene.physics.add.existing(this); 
        this.body.allowGravity = false;
        this.points = pointValue;
        this.enemySpeed = game.settings.worldSpeed;
        this.setSize(64, 600);
    }

    update() {
        this.enemySpeed = game.settings.worldSpeed;
        this.x -= this.enemySpeed;
        
        

    }
    
    fall() {
        // this.destroy();
        //this.y += Phaser.Math.Between(4,9);
        this.body.allowGravity = true;
    }
    
    
} 