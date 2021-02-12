const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "BUBBLE BOBBLE",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [GameScene,JoystickScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 768,
        height: 1024,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
};
const game = new Phaser.Game(config);
