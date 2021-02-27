
class GameScene extends Phaser.Scene{
    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/1.png');
        this.load.image('bg2', 'bg/2.png');
        this.load.image('block', 'bg/3.png');
        this.load.image('player', 'player/1.png');
    }

    create(){
        this.bg=this.add.tileSprite(0, 0, WIDTH, HEIGHT, 'bg').setScale(8)
            .setOrigin(0, 0);
        this.bg2=this.add.tileSprite(0, HEIGHT-100, WIDTH, 10, 'bg2').setScale(8)
            .setOrigin(0, 0);

        this.player=this.physics.add.sprite(200,HEIGHT/2,'player').setScale(5);
        this.player.setGravityY(200);
        this.player.setCollideWorldBounds(true);

        this.delay = 3000;
        this.timer = this.time.addEvent({ delay: this.delay,
            callback: this.onTimerEvent, callbackScope: this, loop: true });
    
        this.input.on('pointerdown', function (pointer) {
            if(this.player_tweens)this.player_tweens.stop();
            this.player.setVelocity(0,-150);
            this.player_tweens = this.tweens.timeline({
                tweens: [
                    {
                        targets:this.player,
                        angle:-30,
                        duration:300,
                        onComplete:function(tween,targets){
                            this.player.setVelocity(0,0);
                        }.bind(this)
                    },
                    {
                        targets:this.player,
                        angle:30,
                        duration:500,
                        
                    }
                ]
            });
        }.bind(this));
    }
    
    update(){
        this.bg.tilePositionX -=0.5;
        this.bg2.tilePositionX +=1;     
    }

    onTimerEvent(){
       this.addBlock();
    }

    addBlock(){
        this.blockGroup =this.physics.add.group();

        var randomY=Phaser.Math.Between(700,1000);
        var randomHeight=Phaser.Math.Between(300,400);

        var block1 =this.physics.add.sprite(WIDTH,randomY-HEIGHT-randomHeight,'block').setScale(5).setFlipY(true);
        var block2 =this.physics.add.sprite(WIDTH,randomY,'block').setScale(5);
        
        this.blockGroup.add(block1);
        this.blockGroup.add(block2);

        this.tweens.add({
            targets:block1,
            x:0,
            duration:8000,
            onComplete:function(tween,targets){
                block1.destroy();
            }.bind(this)
        })

        this.tweens.add({
            targets:block2,
            x:0,
            duration:8000,
            onComplete:function(tween,targets){
                block2.destroy();
            }.bind(this)
        })

        this.physics.add.overlap(this.blockGroup ,this.player,this.hitBlockPlayer,null,this);
    }

    hitBlockPlayer(){
        alert("Game Over!!!");
        this.scene.restart();
    }
}