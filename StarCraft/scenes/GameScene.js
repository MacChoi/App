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
        EventEmitter.on('moveCursorCamera', this.moveCursorCamera, this);
        Map.create(this,0,0);
        this.cameras.main.setSize(WIDTH, HEIGHT);
        // this.cameras.main.startFollow(Cursor.sprite);
    }

    moveCursorCamera(x,y){
        console.log(x,y)
        this.cameras.main.scrollX+=x;
        this.cameras.main.scrollY+=y;
    }
}