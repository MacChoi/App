class GameScene extends Phaser.Scene {
    static group;
    static graphics;
    constructor(){
        super({
            key:'GameScene',
        });
    }
    create(){
        GameScene.group = this.physics.add.group();
        GameScene.graphics = this.add.graphics();
        this.bg = this.add.image(WIDTH/2, HEIGHT/2, 'bg').setScale(5);
        new Marine(this,350,350).setVelocityX(1);
        new Marine(this,450,350).setVelocityX(1);
        new Marine(this,550,350).setVelocityX(1);
        new Marine(this,650,350).setVelocityX(1);
        new Marine(this,750,350);
    }
}