class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });
    }

    preload(){
        this.scene.remove('LogoScene');
        this.textures.remove('logo');
        this.game.canvas.style.cursor = "none";
    }

    create(){
        // this.add.image(0,0, 'bg').setOrigin(0).setScale(3.2);
        Cursor.create(this,100,100);
    }
}