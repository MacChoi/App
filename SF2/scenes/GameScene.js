class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.width = game.config.width;
        this.height = game.config.height;
        this.playerStartX=this.width/2;
        this.playerStartY=this.height-10;
        this.bounds=new Phaser.Geom.Rectangle(50,0,this.width,this,this.height);
    }

    preload(){
        this.load.image('bg', './assets/images/bg/0.png');

        this.load.setPath('./assets/sound');
        this.load.audio('combo1','player/0.mp3');
        this.load.audio('combo2','player/1.mp3');
        this.load.audio('combo3','player/2.mp3');

        Player.preload();
        Fire.preload();
    }

    create(){
        this.sound_combo1 = this.sound.add('combo1');
        this.sound_combo2 = this.sound.add('combo2');
        this.sound_combo3 = this.sound.add('combo3');

        this.image = this.add.image(-200, -80, 'bg').setOrigin(0);

        this.player = Player.create(this,this.width/2,200);
        this.player.setCollideWorldBounds(true);
        this.player.body.customBoundsRectangle=this.bounds;
        
        this.cameras.main.setSize(this.width, this.height+200);
        this.cameras.main.startFollow(this.player);

        eventsCenter.on('keyup', this.onKeyCode, this);

        this.input.keyboard.createCombo([ 
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.RIGHT,
            Phaser.Input.Keyboard.KeyCodes.A,
        ], { resetOnMatch: true ,maxKeyDelay: 500});
        this.input.keyboard.createCombo([ 
            Phaser.Input.Keyboard.KeyCodes.RIGHT,
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.LEFT,
            Phaser.Input.Keyboard.KeyCodes.A,
        ], { resetOnMatch: true , maxKeyDelay: 1000 });
        this.input.keyboard.createCombo([ 
            Phaser.Input.Keyboard.KeyCodes.DOWN,
            Phaser.Input.Keyboard.KeyCodes.UP,
            Phaser.Input.Keyboard.KeyCodes.A,
        ], { resetOnMatch: true , maxKeyDelay: 500});

        this.input.keyboard.on('keycombomatch', function (keyCombo, keyboardEvent) {
            var combo=new String(keyCombo.keyCodes).replaceAll('\,','');
            this.player.stop();
            if(this.player_tweens)this.player_tweens.stop();
            if(combo==""+Phaser.Input.Keyboard.KeyCodes.DOWN+
                    Phaser.Input.Keyboard.KeyCodes.RIGHT+
                    Phaser.Input.Keyboard.KeyCodes.A){
                    this.onCombo1();      
            }else if(combo==""+ Phaser.Input.Keyboard.KeyCodes.RIGHT+
                    Phaser.Input.Keyboard.KeyCodes.DOWN+
                    Phaser.Input.Keyboard.KeyCodes.LEFT+
                    Phaser.Input.Keyboard.KeyCodes.A){
                    this.onCombo2();      
            }else if(combo==""+
                    Phaser.Input.Keyboard.KeyCodes.DOWN+
                    Phaser.Input.Keyboard.KeyCodes.UP+
                    Phaser.Input.Keyboard.KeyCodes.A){
                    this.onCombo3();                
            }
        }.bind(this));
    }

    onCombo1(){
        this.sound_combo1.play();
        this.onFire();
        this.player.play('player_combo1');
        this.tweens.add({
            targets:this.player,
            x:this.player.x,
            duration:500,
            onComplete:function(tween,targets){
                this.player.play('player_idle');
            }.bind(this)
        });      
    }

    onCombo2(){
        this.sound_combo2.play();
        this.player.play('player_combo2');
        this.player_tweens=this.tweens.add({
            targets:this.player,
            y:this.player.y-70,
            duration:1000,
            yoyo:true,
            onComplete:function(tween,targets){
                this.player.play('player_idle');
            }.bind(this)
        });              
    }

    onCombo3(){
        this.sound_combo3.play();
        this.player.play('player_combo3');
        this.player_tweens=this.tweens.add({
            targets:this.player,
            y:this.player.y-70,
            duration:1000,
            yoyo:true,
            onComplete:function(tween,targets){
                this.player.play('player_idle');
            }.bind(this)
        });
    }

    onFire(){
        var fire= Fire.create(this,this.player.x+50,170).setScale(2);
        this.tweens.add({
            targets:fire,
            x:this.width,
            duration:1000,
            onComplete:function(tween,targets){
                fire.destroy();
            }.bind(this)
        });      
    }

    onKeyCode(event){
        if (this.player.anims.getName() != 'player_idle')return;
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.player.play('player_left');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x-50,
                    duration:500,
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.player.play('player_right');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    x:this.player.x+50,
                    duration:500,
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.player.play('player_jump');
                this.player_tweens=this.tweens.add({
                    targets:this.player,
                    y:this.player.y-70,
                    duration:500,
                    yoyo:true,
                    onComplete:function(tween,targets){
                        this.player.play('player_idle');
                    }.bind(this)
                });
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.player.play('player_punch');
                this.player.chain([ 'player_idle' ]);
            break;
        }
    }
}