const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 650,
        height: 400,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    pixelArt: true,
};
const GAME = new Phaser.Game(CONFIG);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;
const EMITTER = new Phaser.Events.EventEmitter();