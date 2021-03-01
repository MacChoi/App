const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    scene: [LoadScene,GameScene,JoystickScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 200,
        height: 200,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'matter',
        matter: {
            // debug: true,
            gravity: {
                x: 0,
                y: 1
            }
        }
    }
};
const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;