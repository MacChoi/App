class IntroScene extends Phaser.Scene{
    constructor(){
        super({
            key:'IntroScene',
            active:true
        });
    }

    preload(){
        var onCompleteImage = function(){
            this.add.image(WIDTH/2, HEIGHT/2, 'title').setScale(5);
        }
        this.load.once('complete', onCompleteImage, this);
        this.load.image('title', 'assets/images/title/1.png');
        this.load.start();

        this.graphics = this.add.graphics();
        this.load.on('progress', function (value) {
            this.graphics.clear();
            this.graphics.fillStyle(0x00ff00, 1);
            this.graphics.fillRect(0, HEIGHT-100, 800 * 100, 60);            
        }.bind(this));
        
        this.load.on('fileprogress', function (file) {
            // console.log('Loading asset : ' + file.type);
        });

        this.load.on('complete', function () {
            this.scene.start('GameScene');
        }.bind(this));

        this.load.pack('pack', 'pack.json');
        this.load.sceneFile('GameScene', 'scenes/GameScene.js');
    }

    create(){
        this.input.on('pointerdown', function (pointer) {
            this.scene.start('GameScene');
            this.graphics.destroy();
            this.textures.remove('title');
            this.scene.destroy('IntroScene');
        }, this);
    }
}