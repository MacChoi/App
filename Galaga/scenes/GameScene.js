class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });

        this.gameWidth = game.config.width;
        this.gameHeight = game.config.height;
        this.playerStartX=this.gameWidth/2;
        this.playerStartY=this.gameHeight-10;
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/0.png');
        this.load.image('player', 'player/0.png');
        this.load.image('missile', 'missile/0.png');
        this.load.image('explosion','explosion/0.png');

        this.load.atlas('enemy', 'enemy/sprites.png', 'enemy/sprites.json');
    }

    update(){
        this.bg.tilePositionY -=0.5;        
    }

    create(){
        this.physics.world.setBoundsCollision(true, true, true, true);

        eventsCenter.on('keyup', this.onKeyCode, this);

        this.bg = this.add.tileSprite(0, 0, 256, 200, 'bg')
            .setOrigin(0, 0);
        
        this.anims.create({ key: 'enemy1', frames: this.anims.generateFrameNames('enemy', { prefix: 'A_', end: 1, zeroPad: 1 }), duration: 1000,repeat: -1 });
        this.anims.create({ key: 'enemy2', frames: this.anims.generateFrameNames('enemy', { prefix: 'B_', end: 1, zeroPad: 1 }), duration: 1000,repeat: -1 });
        this.anims.create({ key: 'enemy3', frames: this.anims.generateFrameNames('enemy', { prefix: 'C_', end: 1, zeroPad: 1 }), duration: 1000,repeat: -1 });

        this.player=this.physics.add.sprite(this.playerStartX,this.playerStartY,'player');
        this.player.setCollideWorldBounds(true)

        this.addEnemy(50,20);
    }

    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setVelocityX(-50);
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setVelocityX(50);
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.fireMissile(this.player.x,this.player.y);
            break;
        }
    }

    addEnemy(x,y){
        this.groupEnemy = this.physics.add.group({
            key: 'enemy',
            frameQuantity: 45,
            gridAlign: { width:9, cellWidth: 20, cellHeight: 20, x: x, y: y }
        });

        var i=0;
        this.groupEnemy.children.each(object => {
            if(i<=8)object.play('enemy1');
            else if(i<=17)object.play('enemy2');
            else if(i>16 )object.play('enemy3');
            i++;

            object.setDataEnabled();
            object.data.set('x', object.x);
            object.data.set('y', object.y);
        });
    }

    attackPlayer(){
        this.groupEnemy.children.each(object => {
            if(Phaser.Math.Between(0,50)!=0)return;
            object.angle=180;
            this.tweens.add({
                targets:object,
                x:this.player.x,
                y:this.player.y,
                duration:5000,
                onComplete:function(tween,targets){
                    if(object.data==null)return;
                    object.angle=0;
                    this.tweens.add({
                        targets:object,
                        x:object.data.get('x'),
                        y:object.data.get('y'),
                        duration:5000,
                    })
                }.bind(this)
            })
        });
    }

    fireMissile(x,y){
        var missile=this.physics.add.image(x,y,'missile');
        this.physics.add.overlap(missile,this.groupEnemy,this.hitMissileEnemy,null,this);

        this.tweens.add({
            targets:missile,
            y:0,
            duration:1000,
            onComplete:function(tween,targets){
                missile.destroy();
            }.bind(this)
        })
    }

    hitMissileEnemy(missile,enemy){
        missile.destroy();
        enemy.destroy();
        var explosion=this.add.image(missile.x,missile.y,'explosion');
        explosion.setScale(0.5);
        this.tweens.add({
            targets:explosion,
            alpha:0,
            scale:0,
            duration:1000,
            onComplete:function(tween,targets){
                explosion.destroy();
            }.bind(this)
        })
        
        if(this.groupEnemy.children.size == 0)this.addEnemy(50,20);

        this.attackPlayer();
    }
}