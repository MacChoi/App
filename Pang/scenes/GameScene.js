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
        this.load.image('bg','bg/bg.png');
        this.load.spritesheet('player','player/sheet.png',{frameWidth:31,frameHeight:32});

        this.load.image('harpoon','harpoon/0.png');
        this.load.image('ball','ball/0.png');
        this.load.image('explosion1','explosion/0.png');
        this.load.image('explosion2','explosion/1.png');
    }

    crateAnimation(){
        this.anims.create({
            key:'idle',
            frames:this.anims.generateFrameNumbers('player',{frames:[7,8]}),
            frameRate:5,
            repeat:-1
        })
        this.anims.create({
            key:'fire',
            frames:this.anims.generateFrameNumbers('player',{frames:[4,5]}),
            frameRate:5,
            repeat:-1
        })
        this.anims.create({
            key:'move',
            frames:this.anims.generateFrameNumbers('player',{frames:[0,1,2,3]}),
            frameRate:5,
            repeat:-1
        })
    }

    create(){
        this.crateAnimation();
        eventsCenter.on('keyup', this.onKeyCode, this);
        this.gameBounds=new Phaser.Geom.Rectangle(30,30,this.gameWidth,this,this.gameHeight);

        this.add.image(0,0,'bg').setOrigin(0,0).setScale(5);
        this.player=this.physics.add.sprite(this.gameWidth/2,this.gameHeight-55).setScale(5);
        this.player.setCollideWorldBounds(true);
        // this.player.setBoundsRectangle(this.gameBounds);

        // this.player.body.customBoundsRectangle=this.gameBounds;
        this.player.play('idle');

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

        var bottomZone =this.add.zone(30,this.gameHeight+20).setSize(this.gameWidth,100).setOrigin(0,0);
        this.physics.world.enable(bottomZone);
        bottomZone.body.setImmovable(true);

        this.groupBall= this.add.group();
        this.addBall(500,0,5);

        this.physics.add.overlap(bottomZone,this.groupBall,this.hitBottomZone,null,this);
    }

    hitBottomZone(bottomZone,tergets){
        tergets.setVelocityY(-600-(tergets.scale * 0.5));
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setVelocityX(-300,10);
                this.player.setFlipX(false);
                this.player.play('move');
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setVelocityX(300,10);
                this.player.setFlipX(true);
                this.player.play('move');
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player.setVelocityX(0,0);
                this.player.play('fire');
                this.fireHarpoon();
            break;
        }
    }

    fireHarpoon(){
        if(this.countHarpoon>2)return;
        this.countHarpoon++;
        this.particles2.emitParticleAt(this.player.x,this.player.y-120);
        
        var harpoon=this.physics.add.image(this.player.x,this.player.y-100,'harpoon').setScale(5);
        harpoon.scaleY=0;
        this.physics.add.overlap(harpoon,this.groupBall,this.hitHarpoon,null,this);

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

    hitHarpoon(harpoon,targets){
        if(targets.scale>1)this.addBall(targets.x,targets.y,targets.scale-=1);
        this.particles1.emitParticleAt(targets.x,targets.y);
        harpoon.destroy();
        targets.destroy();
        if(this.groupBall.children.size==0)this.addBall(500,0,5);
    }

    addBall(x,y,scale){
        this.groupBall.add(new Ball(this,x,y,'ball',1,scale));
        this.groupBall.add(new Ball(this,x,y,'ball',-1,scale));
    }
}