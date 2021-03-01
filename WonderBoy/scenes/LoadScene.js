class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key:'LoadScene',
            active:true
        });
    }

    preload(){
        LoadFileText.progress(this,function(){
            this.scene.start('GameScene');
        }.bind(this));
        
        this.load.setPath('./assets/images');
        this.load.image('title', 'title/title.PNG');
        this.load.image('bg', 'bg/bg.png');
        this.load.image('bg2', 'bg/bg2.png');
        
        this.load.image('tiles', 'map/tile.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');
        
        Player.preload(this);
    }

    create(){
        this.add.image(WIDTH/2,HEIGHT/2,'title').setScale(3);
    }
}