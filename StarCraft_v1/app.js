var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
const CONFIG = {
    type: Phaser.AUTO,
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: WIDTH,
        height: HEIGHT,
    },
    scene: [LogoScene],
    pixelArt: true,
};
const GAME = new Phaser.Game(CONFIG);
const EMITTER = new Phaser.Events.EventEmitter();
window.onresize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    GAME.scale.resize(WIDTH, HEIGHT);
    EMITTER.emit("onresize", {width:WIDTH, height:HEIGHT});
};