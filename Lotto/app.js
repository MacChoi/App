const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scene: [LottoScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1000,
        height: 1000,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                y: 200
            }
        }
    }
};
const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;