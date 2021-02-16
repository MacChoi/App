class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });   
    }

    create(){
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.playerStartX=this.width/2;
        this.playerStartY=this.height-10;
        this.bounds=new Phaser.Geom.Rectangle(50,0,this.width,this,this.width);

        this.image = this.add.image(-200, -80, 'bg').setOrigin(0);
        this.player = Player.create(this,this.width/2,200);
        this.player.setCollideWorldBounds(true);
        this.player.body.customBoundsRectangle=this.bounds;
        
        this.cameras.main.setSize(this.width, this.height+200);
        this.cameras.main.startFollow(this.player);

        eventsCenter.on('keyup', this.onKeyCode, this);
    }

    onKeyCode(event){
        if (this.player.anims.getName() != 'player_idle')return;
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
            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.player.play('player_jump');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    y:this.player.y-70,
                    duration:500,
                    yoyo:true,
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player.play('player_punch');
                this.player.chain([ 'player_idle' ]);
            break;
        }
    }
}