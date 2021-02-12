class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.gapX=30;
        this.gapY=30;
        this.gameWidth = game.config.width-(this.gapX*2);
        this.gameHeight = game.config.height-(this.gapY*2);
    }

    preload(){
        this.load.setPath('./assets/images');

        this.load.image('tiles', 'map/map2.png');
        this.load.tilemapTiledJSON('map', 'map/map2.json');
      
        // this.load.image('bg','bg/bg.png');
        this.load.spritesheet('player','player/0.png',{frameWidth:31,frameHeight:32});
        this.load.animation('anims_player_idle', 'player/anims.json');
    }

    update (time, delta)
    {
        this.controls.update(delta);
    }
    create(){
        var map = this.make.tilemap({ key: 'map' });
        var tiles = map.addTilesetImage('map', 'tiles');
        var layer = map.createLayer(0, tiles, 0, 0);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        const cursors = this.input.keyboard.createCursorKeys();
        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
        
        eventsCenter.on('keyup', this.onKeyCode, this);
        this.gameBounds=new Phaser.Geom.Rectangle(this.gapX,this.gapY,this.gameWidth,this,this.gameHeight);
   
        this.player=this.physics.add.sprite(this.gameWidth/2,this.gameHeight-55).setScale(5);
        // this.player.setCollideWorldBounds(true);
        // this.player.body.setBoundsRectangle(this.gameBounds);
        this.player.play('anims_player_idle');

        // var bottomZone =this.add.zone(30,this.gameHeight+20).setSize(this.gameWidth,100).setOrigin(0,0);
        // this.physics.world.enable(bottomZone);
        // this.physics.add.overlap(bottomZone,this.groupBall,this.hitBottomZone,null,this);
    }

    // hitBottomZone(bottomZone,tergets){
    //     tergets.setVelocityY(-600-(tergets.scale * 0.5));
    // }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
            break;
        }
    }
}