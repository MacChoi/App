class LottoScene extends Phaser.Scene{
    constructor(){
        super({
            key:'LottoScene',
        });
    }
    preload(){
        this.load.setPath('./assets/images');
        this.load.atlas('ball','ball/sprites.png','ball/sprites.json');
        this.load.image('bg', 'bg/1.PNG');
    }

    create(){
        this.bg=this.add.image(WIDTH/2,HEIGHT/2,'bg');

        var balls = this.add.group();
        var customBounds = new Phaser.Geom.Rectangle(0, 0, WIDTH, HEIGHT-300);
        var atlasTexture = this.textures.get('ball');
        var frames = atlasTexture.getFrameNames();
        for (var i = 0; i < frames.length; i++){
            var x = Phaser.Math.Between(400, 800);
            var y = Phaser.Math.Between(300, 600);
            var ball=this.physics.add.image(x, y, 'ball', frames[i]);
            ball.setCollideWorldBounds(true)
            ball.setVelocityX(Phaser.Math.Between(-1000, 1000));
            ball.setVelocityY(Phaser.Math.Between(-1000, 1000));
            ball.setBounceX(1);
            ball.setBounceY(1);
            ball.body.customBoundsRectangle= customBounds;
            balls.add(ball);
            this.tweens.add({
                targets:ball,
                angle:350,
                duration:500,
                repeat:-1,
            })
        }

        this.isClick =false;
        this.count=0;
        this.input.on('pointerdown', function (pointer) {
            if(this.isClick==true)return;
            this.isClick=true;

            if(this.count>5){
                alert("다시 추출 하겠습니까?");
                this.scene.restart();
            }
            this.count++;
            var ball = Phaser.Utils.Array.GetRandom(balls.getChildren());
            ball.setVelocityX(0);
            ball.setVelocityY(0);
            ball.setCollideWorldBounds(false);
            ball.body.setAllowGravity(false)
            this.tweens.add({
                targets:ball,
                x:this.count * 150,
                y:HEIGHT-100,
                scale:2,
                duration:1000,
                onComplete:function(tween,targets){
                    this.isClick =false;
                    this.add.image(ball.x, ball.y, 'ball', ball.frame.name).setScale(2);
                    ball.destroy();
                }.bind(this)
            })
        }.bind(this));
    }
}