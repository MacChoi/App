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
        this.load.image('rect', './assets/images/cursor/0.png');
        Map.preload(this);
        Cursor.preload(this); 
    }

    create(){
        EventEmitter.on('onMiniMapZone', this.onMiniMapZone, this);

        Map.create(this,0,0);
        this.cameras.main.setSize(WIDTH*5, HEIGHT*5);
        this.cameras.main.centerOn(0, 0);
        this.cameras.main.zoom=5;
        this.cameras.main.setBounds(0, 0, 1780, 700);
    }
    
    onMiniMapZone(x,y){
        this.cameras.main.x=-(x-60)*16;
        this.cameras.main.y=(500-y)*16;
    }
}