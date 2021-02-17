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
        this.load.image('bg1', 'bg/1.png');
        this.load.image('bg2', 'bg/2.png');
        Player.preload(this);
    }

    create(){
        this.scene.start('GameScene');
    }
}