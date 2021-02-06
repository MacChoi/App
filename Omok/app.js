var config = {
    type: Phaser.AUTO,
    parent: 'phaser',
    title: "OMOK",
    version: "0.0.1",
    backgroundColor: '#000000',
    scene: [GameScene],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser',
        width:300,
        height: 300,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,  
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true
            } 
        }
    }
};
var game = new Phaser.Game(config);