class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
    }

    preload(){
        LoadFile.progress(this,function(){
            this.scene.remove('TitleScene');
            this.textures.remove('logo');
            this.game.canvas.style.cursor = "none";
            this.scene.add('UIScene', UIScene, true);
        }.bind(this));

        this.load.image('ui', './assets/images/ui/1.png');

        Map.preload(this);
        Cursor.preload(this); 
    }

    create(){
        Cursor.create(this,100,100);
        Cursor.setZone(this,0,0);
        Map.create(this,0,0);
    }
}