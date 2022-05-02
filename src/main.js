// ARTG/CMPM 120 Endless Runner Game by Matty Hill, Micah Mahelona, Mrinmoyee Mishra
// Game Title: Escape From The Airship
// Date Completed: May 2nd, 2022

// CREATIVE TILT:

// 1. 
// Our team decided to implement an inventory into the game. 
// The core mechanic of this inventory would allow a second player to drag bombs 
// and traps on screen to attack the first player who would control the runner. 
// The traps and bombs are placed in the inventory and can be moved on screen with the computer mouse. 
// Each item in the inventory has a cool down period that generates the items in intervals. 
// This was done such that the second player cannot attack the first player with unlimited items.
// We also added falling air bombs that are triggered to fall on the first player when they run under it.

// 2.   
// The theme that we based our game around was steampunk. 
// We included seamless run and jump cycle animations as the first player travels along the platforms. 
// The cool down animation to prevent the second player from shooting bombs or traps resembles a clock. 
// The clock is there to show that the cool down animation is still taking place. 
// The clock disappears when the second player is allowed to shoot the first player again.


let config = {
    type: Phaser.CANVAS,
    width: 1084, //640,
    height: 610, //420
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 3000 },
            debug: false
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
game.paused = false;


