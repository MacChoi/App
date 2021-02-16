class LoadScene extends Phaser.Scene{
    constructor(){
        super({
            key:'LoadScene',
            active:true
        });
    }

    preload(){
        LoadFileText.progress(this);
        
        this.load.image('bg', './assets/images/bg/0.png');
        Player.preload(this); 
    }

    create(){
        this.scene.start('GameScene');
    }
}