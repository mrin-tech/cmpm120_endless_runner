class Paused extends Phaser.Scene {
    constructor() {
      super("pauseScene");
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
        this.add.text(game.config.width/2, 180, 'PAUSED', menuConfig).setOrigin(0.5);
        

        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
          this.scene.resume('playScene');
          this.scene.stop();   
        }
    }
}