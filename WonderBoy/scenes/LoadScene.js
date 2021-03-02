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
   
        this.load.image('tiles', 'map/bg_bank.png');
        this.load.tilemapTiledJSON('map', 'map/bg_map.json');

        Player.preload(this);
    }

    create(){
        this.add.image(WIDTH/2,HEIGHT/2,'title');
    }
}