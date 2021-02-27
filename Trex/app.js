const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scene: [GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 300,
        height: 300,
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

const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;