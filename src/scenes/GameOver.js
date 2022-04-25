class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }

    create() {
        // menu text configuration
        let gameOverConfig = {
            fontFamily: 'Arial',
            fontSize: '20px',
            backgroundColor: '#FFC0CB',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            },
        }
        
        // this menu text is temporary for now
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Game Over', gameOverConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'press <- to restart', gameOverConfig).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start('playScene');    
        }
    }
}