const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "Star Craft Remake Code",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [TitleScene,GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 1280,
        height: 720,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
};

const GAME = new Phaser.Game(config);
const EventEmitter = new Phaser.Events.EventEmitter();
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;