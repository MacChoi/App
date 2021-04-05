const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const SEED = new Date().getTime();

const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor:'0xffffff',
    scene: [MainScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: WIDTH,
        height: HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    seed: SEED,
    dom: {
        createContainer: true
    }
};
const GAME = new Phaser.Game(CONFIG);