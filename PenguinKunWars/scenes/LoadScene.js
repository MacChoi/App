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

        this.load.image('tiles', 'map/map.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');

        Ball.preload(this);
        Player.preload(this);
        Enemy.preload(this);
    }

    create(){
        this.scene.start('GameScene');
    }
}