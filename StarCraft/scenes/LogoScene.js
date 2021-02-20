class LogoScene extends Phaser.Scene{
    constructor(){
        super({
            key:'LogoScene',
            active:true
        });
    }

    preload(){
        LoadFile.progress(this,function(){
            this.scene.start('GameScene');
        }.bind(this));
        this.load.image('logo', './assets/images/logo/1.png');
        this.load.image('bg', './assets/images/bg/1.png');

        Cursor.preload(this);
    }

    create(){
        this.add.image(50,100, 'logo').setOrigin(0).setScale(3.2);
    }
}