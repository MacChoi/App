class PreloadScene extends Phaser.Scene{
    constructor(){
        super({
            key:'PreloadScene',
            active:true
        });
    }

    preload(){
        LoadFileText.progress(this);
    }

    create(){
        // this.scene.remove('LogoScene');
        // this.textures.remove('logo');
    }
}