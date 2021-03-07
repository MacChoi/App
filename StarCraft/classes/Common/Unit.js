class Unit extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        scene.add.existing(this,true);
        scene.physics.world.enable(this);
        this.scene = scene;
        this.setScale(3);
        this.previous={x:this.x,y:this.y};
        this.degree = 0;
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (animation, frame, gameObject) {
            this.degree = this.getAngle(this,this.previous);
            this.body.setSize(this.width,this.height);
            this.previous={x:this.x,y:this.y};
        }.bind(this), this);

        EMITTER.on('pointerUp', this.onPointerup, this);
        EMITTER.on('pointerDrag', this.onPointerDrag, this);

        const table_frames=[
            ['idle_',[1]],
            ['fire_',[19,28]],
            ['move_',[37,46,55,64,73,82,91,100,109]],
        ]
        this.makeAnimation(table_frames);
        this.play('idle_0');
    }

    onPointerup(pointer){}
    onPointerDrag(pointer){}

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

    getAngle(p1,p2){
        // if(p1.x == p2.x & p1.y == p2.y)return this.degree;
        var angle = Phaser.Math.Angle.Between(p1.x, p1.y,p2.x, p2.y);
        var reverseAngle = Phaser.Math.Angle.Reverse(angle + Math.PI / 2);
        var degree = Math.round(Phaser.Math.RadToDeg(reverseAngle));
        degree=degree-(degree%22.5);
        if(degree>180){
            this.setFlipX(true);
            degree = 180-(degree-180);
        }
        else this.setFlipX(false);
        return degree;
    }

    aniPlay(key){
        this.play(key+"_"+this.degree);
        console.log(key+"_"+this.degree)
    }
}