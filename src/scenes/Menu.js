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
            fontFamily: 'Arial',
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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Menu screen', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'player 1 uses wasd keys to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'press -> to start game', menuConfig).setOrigin(0.5);

        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.sound.play('music');
          this.scene.start('playScene');    
        }
    }
}