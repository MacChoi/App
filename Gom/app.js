const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scene: [MainScene,RenderScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: WIDTH,
        height: HEIGHT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
};
const GAME = new Phaser.Game(CONFIG);