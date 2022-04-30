class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOverScene");
    }
    preload() {
        this.load.audio('music', './assets/Sound/Gigakoops - Ill Rip Every Tooth Out of That Shark and Make Them Into the Most Beautiful Necklace You Ever Seen.mp3');
    }
    create() {
        // hiding mouse
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';
        
        // menu text configuration
        let gameOverConfig = {
            fontFamily: 'INVASION2000',
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
        gameOverConfig.fontSize = '40px';
        // this menu text is temporary for now
        this.add.text(game.config.width/2, 260, 'Game Over', gameOverConfig).setOrigin(0.5);
        gameOverConfig.fontSize = '30px';
        this.add.text(game.config.width/2, 320, 'press <- to restart press -> to menu', gameOverConfig).setOrigin(0.5);
        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        this.game.sound.stopAll();
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          this.scene.start('playScene');
          this.sound.play('music');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
          }
    }
}