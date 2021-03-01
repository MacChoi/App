class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });

        this.speed =5;
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);
        this.add.image(0,0,'bg').setOrigin(0,0.5).setScale(1);
        this.player = Player.create(this,0,HEIGHT-70);
        this.cameras.main.setSize(WIDTH, HEIGHT);
        this.cameras.main.startFollow(this.player);
        var map = this.add.tilemap('map');
        var tileset = map.addTilesetImage('map','tiles');
        var layer = map.createLayer('Tile Layer 1', tileset);
        layer.y =-200
        layer.visible=false;
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setFlipX(true);
                this.player.play("player_left");
                this.player.setVelocityX(-this.speed);
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setFlipX(false);
                this.player.play("player_left");
                this.player.setVelocityX(this.speed);
            break; 
            case Phaser.Input.Keyboard.KeyCodes.UP:
                if (this.player.anims.getName() == 'player_jump')return;
                this.player.play("player_jump");
                this.tweens.add({
                    targets:this.player,
                    y:this.player.y-100,
                    duration:500,
                    // yoyo:true,
                    onComplete:function(tween,targets){
                        this.player.play("player_idle");
                    }.bind(this)
                });
            break; 
            case Phaser.Input.Keyboard.KeyCodes.A:
                
            break; 
        }
    }
}