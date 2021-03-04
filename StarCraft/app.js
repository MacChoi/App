const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: {
        preload:function(){
            this.load.sceneFile('IntroScene', 'scenes/IntroScene.js');
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    }
};
const GAME = new Phaser.Game(CONFIG);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;
const EMITTER = new Phaser.Events.EventEmitter();