let config = {
    type: Phaser.CANVAS,
    width: 960, //640,
    height: 610, //420
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
    scene: [ Menu, Play]
}


let game = new Phaser.Game(config);

// reserving keyboard variables
let keyW, keyA, keyS, keyD, keySPACE, keyRIGHT;

let borderUISize = 40;
let borderPadding = borderUISize / 3;
let platformGroup;
