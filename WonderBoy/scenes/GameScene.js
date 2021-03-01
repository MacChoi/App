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
        this.player = Player.create(this,50,HEIGHT-70);
        
        this.cameras.main.setSize(WIDTH, HEIGHT);
        this.cameras.main.startFollow(this.player);
        var map = this.add.tilemap('map');
        var tileset = map.addTilesetImage('map','tiles');
        var layer = map.createLayer('Tile Layer 1', tileset);
        layer.y =-205
        layer.visible=false;
        map.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer);

        map.getObjectLayer('Object Layer 1')['objects'].forEach(object => {
            var bg=this.matter.add.image(object.x +object.width/2 -50,object.y +object.height/2-HEIGHT-130, 'bg2', null, { isStatic: true }).setAngle(-14);
            bg.visible=false;
        });
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setFlipX(true);
                this.player.setVelocityX(-this.speed);
                if (this.isJump == true)return;
                if (this.player.anims.getName() != 'player_left'){
                    this.player.play("player_left");
                }
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setFlipX(false);
                this.player.setVelocityX(this.speed);
                if (this.isJump == true)return;
                if (this.player.anims.getName() != 'player_left'){
                    this.player.play("player_left");
                }  
            break; 
            case Phaser.Input.Keyboard.KeyCodes.UP:
                if (this.isJump == true)return;
                this.isJump=true;
                this.player.play("player_jump");
                this.player.setVelocityY(-7);
               
                this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
                    this.player.play("player_idle");
                    this.isJump=false;
                }, this);
            break; 
            case Phaser.Input.Keyboard.KeyCodes.A:
                console.log(this.isJump)
            break; 
        }
    }

    update(){
        if(this.player.y>250)this.player.y=-100;
    }
}