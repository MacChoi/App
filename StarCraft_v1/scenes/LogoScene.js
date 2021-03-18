class LogoScene extends Phaser.Scene {
    constructor(){
        super({
            key:'LogoScene',
            active:true
        });
    }

    preload (){
        EMITTER.on('onresize', this.onResize, this);
        this.load.image('bg', 'assets/images/logo/bg.png');
        this.load.image('title', 'assets/images/logo/title.png');
        this.load.image('progress', 'assets/images/logo/progress.png');
    }

    create(){
        this.bg=this.add.tileSprite(0, 0, WIDTH , HEIGHT, 'bg').setOrigin(0, 0);
        this.title=this.add.image(WIDTH/2, HEIGHT/2,'title').setScale(1);
        this.progress=this.add.tileSprite(WIDTH/2, HEIGHT/2 + 30, 100 , 1, 'progress').setScale(3);
        this.scene.add('ProgressScene',new ProgressScene() ,true);
    }

    onResize(e){
        this.title.setPosition(WIDTH/2, HEIGHT/2);
        this.progress.setPosition(WIDTH/2, HEIGHT/2+50);
    }

    update(){
        this.progress.tilePositionX -= 2;
    }

    release(){
        this.progress.destroy();
        this.title.destroy();
        this.textures.remove('title');
        this.textures.remove('progress');
        this.scene.destroy('LogoScene');
    }
}

class ProgressScene extends Phaser.Scene{
    constructor(){
        super({
            key:'ProgressScene',
            active:true
        });
    }

    preload(){
        var fileslist='';
        this.load.pack('pack','./pack.json');
        this.load.on('fileprogress', function (file) {
            // console.log(file.url);
            fileslist+=file.url + ',\n'
        }.bind(this));

        this.load.on('complete', function () { 
            console.log('',fileslist);  
        }.bind(this));
    }

    create(){
        this.scene.get('LogoScene').release();
        this.scene.add('HomeScene',new HomeScene() ,true);
    }
}