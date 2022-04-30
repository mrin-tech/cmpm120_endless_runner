class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
        this.load.audio('music', './assets/Sound/Gigakoops - Ill Rip Every Tooth Out of That Shark and Make Them Into the Most Beautiful Necklace You Ever Seen.mp3');
    }
    create() {
        // hiding mouse
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';

        // menu text configuration
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
        
        // this menu text is temporary for now
        menuConfig.fontSize = '50px';
        this.add.text(game.config.width/2, 180, 'Game Title', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        this.add.text(game.config.width/2, 300, 'Player 1 should use WAD to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 340, 'Player 2 should use the mouse to put traps on screen', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 400, 'Press -> To Play!', menuConfig).setOrigin(0.5);
        

        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.sound.play('music');
          this.scene.start('playScene');    
        }
    }
}