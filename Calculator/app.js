const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 250,
        height: 300,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
};
const GAME = new Phaser.Game(CONFIG);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;
const EMITTER = new Phaser.Events.EventEmitter();