class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.gameWidth = game.config.width;
        this.gameHeight = game.config.height;
    }

    preload(){
        this.load.setPath('./assets/images');

        this.load.image('tiles', 'map/map.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');
  
        this.load.atlas('player', 'player/sprites.png', 'player/sprites.json');
        this.load.animation('anims_player', 'player/anims.json');

        this.load.atlas('enemy', 'enemy/sprites.png', 'enemy/sprites.json');
        this.load.animation('anims_enemy', 'enemy/anims.json');

        this.load.atlas('bubble', 'bubble/sprites.png', 'bubble/sprites.json');
        this.load.animation('anims_bubble', 'bubble/anims.json');
    }

    create(){
        eventsCenter.on('keyup', this.onKeyCode, this);

        this.map = this.make.tilemap({ key: 'map' });
        var tiles = this.map.addTilesetImage('map', 'tiles');
        this.layer = this.map.createLayer(0, tiles, 0, 0);
        this.layer.setCollisionByExclusion(-1, true);

        this.map.getObjectLayer('player')['objects'].forEach(object => {
            this.player=this.physics.add.sprite(object.x,object.y-30);
            this.player.play('player_idle');
            this.player.setGravityY(100);
            this.player.body.checkCollision.up=false;
            this.physics.add.collider(this.player, this.layer);
        });

        this.groupMon= this.add.group();
    
        this.physics.add.overlap(this.player,this.groupMon,this.hitLockMon,null,this);
        this.addMon();
    }

    addMon(){
        this.map.getObjectLayer('mon')['objects'].forEach(object => {
            var mon=this.physics.add.sprite(object.x,object.y-30).setOrigin(0, 0);
            mon.play('mon_idle');
            mon.setGravityY(100);
            this.groupMon.add(mon);
            this.player.body.checkCollision.up=false;
            this.physics.add.collider(mon,this.layer);

            mon.on(Phaser.Animations.Events.ANIMATION_REPEAT, function () {
                if(!mon.anims)return;
                if (mon.anims.getName() == 'mon_locked'){
                    mon.setGravityX(Phaser.Math.Between(-50, 50));
                }else if (mon.anims.getName() == 'mon_die'){
                    if(mon.body.blocked.down){
                        mon.stop();
                        mon.destroy();
                        if(this.groupMon.children.size==0)this.addMon();
                    }
                }else{
                    var state=['mon_idle','mon_move','mon_jump'];
                    var flipX=[true,false];
                    mon.play(state[Phaser.Math.Between(0,2)]);
                    mon.setVelocityX(mon.flipX == true ?100:-100);
                    mon.setFlipX(flipX[Phaser.Math.Between(0,1)]);
                    if(mon.anims.getName() == 'mon_jump'){
                        if(this.player.body.blocked.down)mon.setVelocityY(-120);
                    }
                }
            }, this);
        });
    }

    hitBubbleMon(bubble,mon){
        if (mon.anims.getName() == 'mon_idle'){
            mon.play('mon_locked');
            mon.setGravityY(-20);
        }
    }

    hitLockMon(player,mon){
        if (mon.anims.getName() == 'mon_locked'){
            mon.setGravityY(20);
            mon.play('mon_die');
        }
    }
   
    fireBubble(x,y,flipX){
        var bubble=this.physics.add.sprite(flipX == true ?x-15:x+15,y).play('bubble_fire');
        this.physics.add.overlap(bubble,this.groupMon,this.hitBubbleMon,null,this);

        bubble.setFlipX(flipX);
        this.tweens.add({
            targets:bubble,
            x:flipX == true ?x-100:x+100,
            y:y,
            duration:1000,
            onComplete:function(tween,tergets){
                bubble.destroy();
            }.bind(this)
        })
    }
   
    onKeyCode(event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.setVelocityX(-50);
                this.player.setFlipX(true);
                this.player.play('player_move');
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.setVelocityX(50);
                this.player.setFlipX(false);
                this.player.play('player_move');
            break;
            case Phaser.Input.Keyboard.KeyCodes.UP:
                if(!this.player.body.blocked.down)return;
                this.player.setVelocityY(-120);
                this.player.play('player_jump');
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player.setVelocityX(0);
                this.player.play('player_fire');
               this.fireBubble(this.player.x,this.player.y,this.player.flipX);
            break;
        }
    }
}