const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [IntroScene,ProgressScene,GameScene,UIScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080,
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