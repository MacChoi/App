const eventsCenter = new Phaser.Events.EventEmitter();
const config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "OUTRUN",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [LoadScene,GameScene,JoystickScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width: 500,
        height: 390,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
        }
    },
    callbacks: {
        postBoot: function (game) {}        
    }
};
const game = new Phaser.Game(config);