class Platform extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, frame);
        scene.add.existing(this);   // add to existing scene
        scene.physics.add.existing(this); 
        this.body.allowGravity = false;
        this.platformSpeed = 3;

    }

    preload() {

        this.load.image('block1', './assets/Level-Design/Platform-Block (1).png');
        this.load.image('block2', './assets/Level-Design/Platform-Block (2).png');
        this.load.image('block3', './assets/Level-Design/Platform-Block (3).png');
        this.load.image('block4', './assets/Level-Design/Platform-Block (4).png');

    }

    create(x, y) {
        this.createPlatform(x,y);

    }


    update() {
        this.x -= this.platformSpeed;
        

    }

    // generate platforms through random blocks
    createPlatform(x, y) {
        // randomizes blocks to create a platform
        this.grd = this.physics.add.group({
            key: Phaser.Math.RND.pick(['block1', 'block2', 'block3', 'block4']),
            repeat: Phaser.Math.Between(2, 10),
            setXY: { x: x, y: y, stepX: 16 },
            immovable: true,
            allowGravity: false

        });
        // this.grd.setVelocityX(-200);
        // this.physics.add.collider(this.runner, this.grd);
    }

}