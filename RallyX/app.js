const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scene: [LoadScene,GameScene,JoystickScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 500,
        height: 800,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    }
};
const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;