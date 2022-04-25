class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
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
          this.scene.start('playScene');    
        }
    }
}