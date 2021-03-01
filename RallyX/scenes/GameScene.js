class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
        });
        this.speed =150;
        this.countFlag=0;
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);
        this.add.image(0,0,'bg').setOrigin(0).setDepth(-1).setScale(2);
        this.player=this.physics.add.sprite(WIDTH/2,HEIGHT/2,'player').setScale(2);

        this.cameras.main.setSize(WIDTH, HEIGHT);
        this.cameras.main.startFollow(this.player);

        this.map = this.make.tilemap({ key: 'map' });
        var tiles = this.map.addTilesetImage('map', 'tiles');
        this.layer = this.map.createLayer(0, tiles, 0, 0).setScale(2);
        this.layer.setCollisionByExclusion(-1, true);
        this.layer.visible =false;
        this.physics.add.collider(this.player, this.layer);

        this.flagGroup= this.add.group();
        this.map.getObjectLayer('Object Layer 1')['objects'].forEach(object => {
            var flag=this.physics.add.sprite(object.x*2,object.y*2 -10,'flag').setScale(2);
            this.flagGroup.add(flag);

            this.countFlag+=1;
        });
        this.physics.add.collider(this.player, this.flagGroup,this.hitPlayerFlag,null,this);
    }

    hitPlayerFlag(player,flag){
        this.countFlag-=1;
        flag.destroy();
        if(this.countFlag==0){
            alert("Game Clear!!!!");
            this.scene.restart();
        }
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.angle=-90;
                this.player.setVelocityX(-this.speed);
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.angle=90;
                this.player.setVelocityX(this.speed);
            break; 
            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.player.angle=0;
                this.player.setVelocityY(-this.speed);
            break; 
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.player.angle=180;
                this.player.setVelocityY(this.speed);
            break; 
        }
    }
}