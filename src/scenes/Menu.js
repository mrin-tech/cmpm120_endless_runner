class Menu extends Phaser.Scene {
    constructor() {
      super("menuScene");
    }
    preload() {
        this.load.audio('music', './assets/Sound/Gigakoops - Ill Rip Every Tooth Out of That Shark and Make Them Into the Most Beautiful Necklace You Ever Seen.mp3');
        this.load.audio('fire', './assets/Sound/fire.wav');
        this.load.audio('explode', './assets/Sound/explode.wav');
        this.load.audio('trapClose', './assets/Sound/trapClose.wav');
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
        menuConfig.backgroundColor = '#3B493E';
        this.add.text(game.config.width/2, 180, 'Escape From The Airship', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '30px';
        menuConfig.backgroundColor = '#637a68';
        this.add.text(game.config.width/2, 300, 'Player 1 - use W to jump & A-D to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 340, 'Player 2 - use the mouse to place traps on screen', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 400, 'Use ESC to pause the game at any time!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, 500, 'Press -> To Play!', menuConfig).setOrigin(0.5);
        

        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.sound.play('music');
          this.scene.start('playScene');    
        }
    }
}