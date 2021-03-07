class IntroScene extends Phaser.Scene{
    constructor(){
        super({
            key:'IntroScene',
            // active:true
        });
    }
    preload(){
        this.load.image('title', 'assets/images/title/1.png');
    }

    create(){
        this.title=this.add.image(WIDTH/2, HEIGHT/2, 'title').setScale(5);
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
        this.load.pack('pack','pack.json');
        this.percentText = this.make.text({
            x: WIDTH / 2,
            y: HEIGHT-70,
            text: '0%',
            style: {
                font: '40px Arial',
                fill: '#000000'
            }
        }).setOrigin(0.5, 0.5).setDepth(1);
        this.graphics = this.add.graphics();
        this.load.on('progress', function (value) {
            this.graphics.clear();
            this.graphics.fillStyle(0x00ff00, 1);
            this.graphics.fillRect(0, HEIGHT-100, WIDTH * value, 60);
            this.percent=parseInt(value * 100) + '% ';
        }.bind(this));
        
        this.load.on('fileprogress', function (file) {
            // console.log('Loading asset : ' + this.percent + ' ' + file.type + ' : ' + file.key);
            this.percentText.setText('Loading asset : ' + this.percent + ' ' + file.type + ' : ' + file.key);
        }.bind(this));

        this.load.on('complete', function () {
            this.percentText.setText(100 + '% Loading complete' );
        }.bind(this));
    }

    create(){
        this.scene.start('GameScene');
        this.scene.start('UIScene');
        this.release();
    }

    release(){
        this.graphics.destroy();
        this.percentText.destroy();
        this.scene.get('IntroScene').title.destroy();
        this.textures.remove('title');
        this.scene.destroy('IntroScene');
    }
}