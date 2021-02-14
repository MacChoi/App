const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "PIANO",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [PianoScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 1900,
        height: 370,
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