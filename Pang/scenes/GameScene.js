class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.gameWidth = game.config.width;
        this.gameHeight = game.config.height;
        this.countHarpoon = 0;
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/bg.png');
        this.load.image('player', 'player/0.png');
        this.load.image('harpoon', 'harpoon/1.png');
        this.load.image('ball', 'ball/0.png');
        this.load.image('rad', 'ball/0.png');
    }

    create(){
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.gameBounds = new Phaser.Geom.Rectangle(30, 30, this.gameWidth-60, this.gameHeight-60);
        this.add.image(0, 0, 'bg').setOrigin(0, 0).setScale(5);

        this.player = this.physics.add.sprite(this.gameWidth/2, this.gameHeight-120, 'player').setScale(5);
        this.player.setCollideWorldBounds(true);
        this.player.setImmovable(true);
        this.player.body.customBoundsRectangle = this.gameBounds;

        eventsCenter.on('keyup', this.onKeyCode, this);
        this.groupBall = this.add.group();

        this.addBall(500,0,5);

        this.particles = this.add.particles('explosion');
        this.particles.createEmitter({
            frame: 'red',
            angle: { start: 0, end: 360, steps: 32 },
            lifespan: 1000,
            speed: 400,
            quantity: 32,
            scale: { start: 0.3, end: 0 },
            on: false
        });
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
        this.countHarpoon++;
        var harpoon=this.physics.add.sprite(this.player.x, this.player.y, 'harpoon').setScale(5);
        var collider=this.physics.add.collider(harpoon, this.groupBall, this.harpoonHit, null, this);
        this.tweens.add({
            targets:harpoon,
            y:0,
            duration:2000,
            onComplete:function(tween,tergets){
                this.countHarpoon--;
                harpoon.destroy();
                this.physics.world.removeCollider(collider);
            }.bind(this)
        })
    }

    harpoonHit(harpoon,targets) {
        if(targets.scale>1)
        this.addBall(targets.x,targets.y,targets.scale-=1);

        this.particles.emitParticleAt(targets.x,targets.y);
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