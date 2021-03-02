class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });

        this.speed =5;
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);
        var map = this.add.tilemap('map');
        var tileset = map.addTilesetImage('bg_bank.png','tiles');
        var layer = map.createLayer('ShoeBox Tile Grab', tileset);
        layer.y =-195
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);
        // layer.visible=false;
    
        this.player = new Player(this,4150,HEIGHT-70);
        
        this.cameras.main.setSize(WIDTH, HEIGHT);
        this.cameras.main.startFollow(this.player);
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setFlipX(true);
                this.player.setVelocityX(-this.speed);
                if (this.player.anims.getName() != 'player_left'){
                    this.player.play("player_left");
                }
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setFlipX(false);
                this.player.setVelocityX(this.speed);
                if (this.player.anims.getName() != 'player_left'){
                    this.player.play("player_left");
                }  
            break; 
            case Phaser.Input.Keyboard.KeyCodes.UP:
                if(this.player.isSensorBottom == false)return;
                this.player.isSensorBottom=false;
                this.player.play("player_jump");
                this.player.setVelocityY(-7);
               
                this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    this.player.play("player_idle");
                }, this);
            break;
        }
    }

    update(){
        if(this.player.y>250)this.player.y=-300;
    }
}