class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key:'LoadScene',
            active:true
        });
    }

    preload(){
        LoadFileText.progress(this);
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/1.png');
        this.load.image('player', 'player/1.png');
        this.load.image('flag', 'flag/1.png');

        this.load.image('tiles', 'map/map.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');
    }

    create(){
        this.scene.start('GameScene');
    }
}