class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key:'GameScene',
        });
    }
    create(){
        this.bg = this.add.image(WIDTH/2, HEIGHT/2, 'bg').setScale(5);
        new Marine(this,750,350);
    }
}