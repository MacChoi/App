const config = {
    type: Phaser.AUTO,
    title: "Time Timer",
    backgroundColor: '#ffffff',
    scene: [TimerScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 620,
        height: 620,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};

const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;