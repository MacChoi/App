const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "Star Craft Remake Code",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [LogoScene,PreloadScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 1280,
        height: 720,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    dom: {
        createContainer: true
    },
};
const game = new Phaser.Game(config);