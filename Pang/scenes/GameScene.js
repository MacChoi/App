class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.gameWidth = game.config.width-60;
        this.gameHeight = game.config.height-60;
        this.countHarpoon = 0;
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/bg.png');
        this.load.image('player', 'player/0.png');
        this.load.image('harpoon', 'harpoon/1.png');
        this.load.image('ball', 'ball/0.png');
        this.load.image('explosion1', 'explosion/0.png');
        this.load.image('explosion2', 'explosion/1.png');
    }

    create(){
        // this.physics.world.setBoundsCollision(true, true, true, true);
        this.gameBounds = new Phaser.Geom.Rectangle(30, 30, this.gameWidth, this.gameHeight);
        
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(5);

        this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight-55, 'player').setScale(5);
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(true);
        this.player.body.customBoundsRectangle = this.gameBounds;

        eventsCenter.on('keyup', this.onKeyCode, this);
        this.groupBall = this.add.group();

        this.addBall(500,0,5);

        this.particles1 = this.add.particles('explosion1').createEmitter({
            angle: { start: 0, end: 360, steps: 32 },
            lifespan: 1000,
            speed: 400,
            quantity: 32,
            scale: { start: 0.3, end: 0 },
            on: false
        });

        this.particles2 = this.add.particles('explosion2').createEmitter({
            scale: { start: 0.5, end: 0 }, 
            on: false 
        });

        var bottomZone = this.add.zone(30, this.gameHeight+20).setOrigin(0, 0).setSize(this.gameWidth, 100);
        this.physics.world.enable(bottomZone);
        bottomZone.body.setAllowGravity(false);
        bottomZone.body.moves = false;

        this.physics.add.overlap(bottomZone, this.groupBall, this.bottomZone, null, this);
    }

    bottomZone(bottomZone,targets){
        targets.setVelocityY(-600 -(targets.scale * 0.5));
    }

    onKeyCode (event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setVelocityX(-300, 10);
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setVelocityX(300, 10);
               break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.fireHarpoon();
            break  
        }
    }

    fireHarpoon(){
        if(this.countHarpoon>2)return;
        this.particles2.emitParticleAt(this.player.x, this.player.y-120);

        this.countHarpoon++;
        var harpoon=this.physics.add.image(this.player.x, this.player.y-100, 'harpoon').setScale(5);
        harpoon.scaleY =0;
        this.physics.add.overlap(harpoon, this.groupBall, this.hitHarpoon, null, this);
        
        this.tweens.add({
            targets:harpoon,
            y:350,
            scaleY:5,
            duration:1000,
            onComplete:function(tween,tergets){
                this.countHarpoon--;
                harpoon.destroy();
            }.bind(this)
        })
    }

    hitHarpoon(harpoon,targets) {
        if(targets.scale>1)
        this.addBall(targets.x,targets.y,targets.scale-=1);

        this.particles1.emitParticleAt(targets.x,targets.y);
        harpoon.destroy();
        targets.destroy();
        
        if(this.groupBall.children.size == 0)
        this.addBall(500,0,5);
    }

    addBall(x,y,scale){
        this.groupBall.add(new Ball(this,x,y,"ball",1,scale));
        this.groupBall.add(new Ball(this,x,y,"ball",-1,scale));
    }
}