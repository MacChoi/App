const config = {
    type: Phaser.AUTO,
    title: "Clock",
    backgroundColor: '#ffffff',
    scene: [ClockScene],
    scale: {
        mode: Phaser.Scale.FIT,
        width: 700,
        height: 800,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
};

const GAME = new Phaser.Game(config);
const WIDTH = GAME.config.width;
const HEIGHT = GAME.config.height;