class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key:'GameScene',
        });
    }

    create(){
        this.add.image(WIDTH/2, HEIGHT/2, 'bg').setScale(5);
        new Cursor(this,50,50);
    }
}
