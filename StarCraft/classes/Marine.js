class Marine extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        scene.add.existing(this,true);
        scene.physics.world.enable(this);

        EMITTER.on('pointerUp', this.onPointerup, this);
        EMITTER.on('pointerDrag', this.onPointerDrag, this);

        this.scene = scene;
        this.setScale(3).setDepth(1);
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (animation, frame, gameObject) {
            this.body.setSize(this.width,this.height);
        }.bind(this), this);

        const table_frames=[
            ['idle_',[1]],
            ['fire_',[19,28]],
            ['move_',[37,46,55,64,73,82,91,100,109]],
        ]
        this.makeAnimation(table_frames);
        this.play('idle_0');
    }

    onPointerup(pointer){
        if(this.tweens)this.tweens.stop();
        var angle = Phaser.Math.Angle.Between(pointer.x, pointer.y,this.x, this.y);
        var reverseAngle = Phaser.Math.Angle.Reverse(angle + Math.PI / 2);
        // var rotation = angle - Math.PI / 2;
        var distance = Phaser.Math.Distance.Between(pointer.x, pointer.y,this.x, this.y);
        var rads = Math.round(Phaser.Math.RadToDeg(reverseAngle));
        rads=rads-(rads%22.5);
        if(rads>180){
            this.setFlipX(true);
            rads = 180-(rads-180);
        }
        else this.setFlipX(false);
        this.play('move_' + rads);
        
        this.tweens=this.scene.tweens.add({
            targets: this,
            x:pointer.x,
            y:pointer.y,
            duration: distance *5,
            onUpdate: function (tween) {
            }.bind(this),
            onComplete: function (tween) {
                this.play('idle_'+rads);
            }.bind(this),
        });
    }

    onPointerDrag(pointer){
        // console.log(pointer)
    }

    makeAnimation(table_frames){
        const angle_chunk = 22.5;
        const frames_chunk = 9;
        for (var i = 0; i < table_frames.length; i++) {
            var start_frame = 0;
            for (var j = 0; j <= 360/2; j+=angle_chunk) {
                var frames= new Array();
                for (var k = 0; k <table_frames[i][1].length; k++) {
                    frames.push(table_frames[i][1][k] + start_frame);
                }
                start_frame+=1;            
                // console.log(table_frames[i][0]+j ,frames)
                this.anims.create({
                    key: table_frames[i][0]+j,
                    frames: this.anims.generateFrameNumbers('marine', { frames: frames }),
                    frameRate: 10,
                    repeat: table_frames[i][1].length==1?1:-1
                });
            }  
        }
    }
}