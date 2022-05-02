let config = {
    type: Phaser.CANVAS,
    width: 1084, //640,
    height: 610, //420
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000 },
            debug: true
        }
    },
    scene: [Menu, Play, GameOver, Paused]
}


let game = new Phaser.Game(config);
game.settings = {
    worldSpeed: 8
};

// reserving keyboard variables
let keyW, keyA, keyS, keyD, keySPACE, keyRIGHT, keyLEFT, keyESC;

let borderUISize = 40;
let borderPadding = borderUISize / 3;
let platformGroup;
let enemyGroup;
let globalHighScore = 0;
let touchFlag = false;