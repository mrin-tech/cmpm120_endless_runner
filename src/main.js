let config = {
    type: Phaser.CANVAS,
    width: 1280, //640,
    height: 840, //420
    scene: [ Menu, Play, Play2 ]
}


let game = new Phaser.Game(config);

// reserving keyboard variables
let keyR, keyRIGHT, keyLEFT, keyP, keyA, keyD, keyF, keyUP;

let borderUISize = 40;
let borderPadding = borderUISize / 3;
