const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "OMOK",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [GameScene,JoystickScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 1000,
        height: 2000,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
};
const game = new Phaser.Game(config);
