class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });

        this.gameWidth = game.config.width;
        this.gameHeight = game.config.height;
        this.playerStartX=this.gameWidth/2;
        this.playerStartY=this.gameHeight-70;
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/0.png');
        this.load.image('effect', 'enemy/0.png');
        
        this.load.atlas('player', 'player/sprites.png', 'player/sprites.json');
        this.load.animation('anims_player', 'player/anims.json');

        this.load.atlas('enemy', 'enemy/sprites.png', 'enemy/sprites.json');
        this.load.animation('anims_enemy', 'enemy/anims.json');
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);

        this.bg = this.add.tileSprite(0, 0, 256, 200, 'bg')
            .setOrigin(0, 0);
        
        this.player=this.physics.add.sprite(this.playerStartX,this.playerStartY);
        this.player.play('player_idle');

        this.addEnemy(false);
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                if (this.player.anims.getName() != 'player_idle')return;
                this.player.setFlipX(false);
                this.player.play('player_move');
                this.player.tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x-1,
                    duration:1000,
                    onUpdate:function(tween,targets){
                        this.bg.tilePositionX += this.player.flipX == true ?1:-1;
                    }.bind(this),
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                if (this.player.anims.getName() != 'player_idle')return;
                this.player.setFlipX(true);
                this.player.play('player_move');
                this.player.tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x+1,
                    duration:1000,
                    onUpdate:function(tween,targets){
                        this.bg.tilePositionX += this.player.flipX == true ?1:-1;
                    }.bind(this),
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.UP:
                if (this.player.anims.getName() != 'player_idle')return;
                if(this.player.y == this.gameHeight-70){
                    this.player.play('player_jump');
                    this.tweens.timeline({
                        tweens: [
                            {
                                targets:this.player,
                                y:this.playerStartY -20,
                                duration:300,
                            },
                            {
                                targets:this.player,
                                y:this.playerStartY,
                                duration:200,
                                onComplete:function(tween,targets){
                                    this.player.play('player_idle');
                                }.bind(this)
                            }
                        ]
                    });
                }
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player.setVelocityX(0);
                if(this.player.y ==this.playerStartY)
                    this.player.play('player_kick');
                else
                this.player.play('player_kick2');

                this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    this.player.play('player_idle');
                }.bind(this));
            break;
        }
    }

    addEnemy(flipX){
        var enemy = this.physics.add.sprite(flipX == true ?-10:this.gameWidth,this.gameHeight-70);
        enemy.setFlipX(flipX);
        enemy.play('enemy_move');
        this.tweens.add({
            targets:enemy,
            x:enemy.flipX == true ?120:140,
            duration:1000
        });

        this.physics.add.overlap(enemy,this.player,this.hitEnemyPlayer,null,this);
        
        enemy.on(Phaser.Animations.Events.ANIMATION_REPEAT, function () {
            if(enemy.y > this.gameHeight){
                this.tweens.add({
                    targets:enemy,
                    x:enemy.flipX == true ?120:140,
                    duration:1000
                });
                
                enemy.destroy();
                var flipX=[true,false];
                this.addEnemy(flipX[Phaser.Math.Between(0,1)])
            }
        }.bind(this));
    }

    hitEnemyPlayer(enemy,player){
        if (enemy.anims.getName() == 'enemy_die')return;
        enemy.play('enemy_attack');

        if (this.player.anims.getName() == 'player_kick'|
        this.player.anims.getName() == 'player_kick2'){
            this.player.setFlipX(!enemy.flipX);
            enemy.setVelocityX(enemy.flipX == true ?-100:100);
            enemy.setVelocityY(50);
            enemy.angle=enemy.flipX == true ?-20:20;
            enemy.play('enemy_die');

            var effect= this.add.image(enemy.x,enemy.y-20,'effect')
            this.tweens.add({
                targets:effect,
                y:enemy.y-50,
                duration:1000,
                onComplete:function(tween,targets){
                    effect.destroy();
                }.bind(this)
            });
    
        }
    }
}