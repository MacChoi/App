class LogoScene extends Phaser.Scene{
    constructor(){
        super({
            key:'LogoScene',
            active:true
        });
    }

    preload(){
        this.load.image('logo', './assets/images/logo/1.png');
    }

    create(){
        this.add.image(50,100, 'logo').setOrigin(0).setScale(3.2);
    }
}