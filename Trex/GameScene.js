
class GameScene extends Phaser.Scene{
    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/1.png');
        this.load.image('cactus', 'bg/2.png');
        this.load.spritesheet('player', 'player/1.png', { frameWidth: 50, frameHeight: 50 });
    }

    create(){
        this.bg=this.add.tileSprite(0, HEIGHT-100, WIDTH, 15, 'bg')
            .setOrigin(0, 0);

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player', {start:0,end: 1}),
            frameRate: 5,
            repeat: -1
        });

        this.player = this.physics.add.sprite(50, HEIGHT -100);
        this.player.body.setSize(20,50);
        this.player.play('run');

        this.delay = 3000;
        this.timer = this.time.addEvent({ delay: this.delay,
            callback: this.onTimerEvent, callbackScope: this, loop: true });
    
        this.input.on('pointerdown', function (pointer) {
            if(this.player.y < HEIGHT -100)return;
            this.tweens.add({
                targets:this.player,
                y:this.player.y-50,
                duration:500,
                yoyo:true,
            });
        }.bind(this));     
    }

    onTimerEvent(){
       this.addCactus();
    }

    addCactus(){
        this.cactusGroup =this.physics.add.group();
        var randomX=Phaser.Math.Between(100,200);
        var cactus = this.physics.add.sprite(WIDTH+randomX,HEIGHT-100,'cactus').setScale(0.5);
        cactus.body.setSize(20,50);
        this.cactusGroup.add(cactus);

        this.tweens.add({
            targets:cactus,
            x:0,
            duration:2000,
            onComplete:function(tween,targets){
                cactus.destroy();
            }.bind(this)
        })
        this.physics.add.overlap(this.cactusGroup ,this.player,this.hitCactusPlayer,null,this);
    }

    update(){
        this.bg.tilePositionX +=5;
    }

    hitCactusPlayer(){
        alert("Game Over!!!");
        this.scene.restart();
    }
}