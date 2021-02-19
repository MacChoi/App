class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });
        this.bounds=new Phaser.Geom.Rectangle(0,0,this.width/2,this,this.height);
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.add.image(0,0,'bg').setOrigin(0).setDepth(-1);
    
        this.map = this.make.tilemap({ key: 'map' });
        var tiles = this.map.addTilesetImage('map', 'tiles');
        this.layer = this.map.createLayer(0, tiles, -5, 0);
        this.layer.setCollisionByExclusion(-1, true);
        this.layer.invisible=true;
        this.player = Player.create(this,this.width/2,240);
        this.player.setCollideWorldBounds(true);
        
        this.enemy = Enemy.create(this,this.width/2,29);

        this.addBall();
    }

    addBall(){
        for (var i = 0; i < 10; i++) {
            this.ball=Ball.create(this,i*20,240);
            
            this.physics.add.collider(this.ball, this.layer);
            this.physics.add.overlap(this.player,this.ball,this.hitPlayerBall,null,this);
            this.physics.add.overlap(this.enemy,this.ball,this.hitEnemyBall,null,this);
        }
    }

    hitPlayerBall(player,ball){
        if(this.isFire){
            ball.y-=20;
            ball.setVelocityX(Phaser.Math.Between(0, 50));
            ball.setVelocityY(-100);
        }
        this.isFire=false;
    }

    hitEnemyBall(Enemy,ball){
        if(Phaser.Math.Between(0, 100) != 0)return;
        ball.y+=20;
        ball.setVelocityX(Phaser.Math.Between(0, 50));
        ball.setVelocityY(100);
    }

    onKeyCode(event){
        this.isFire=false;
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.play('player_left');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x-50,
                    duration:500,
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.play('player_right');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x+50,
                    duration:500,
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.isFire=true;
                
            break;
        }
    }
}