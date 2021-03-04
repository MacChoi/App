class Cursor extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        scene.game.canvas.style.cursor = "none";
        scene.add.existing(this);
        scene.physics.world.enable(this);
        scene.anims.fromJSON(scene.cache.json.get(this.constructor.name));
        
        this.scene = scene;
        this.setScale(3).setDepth(1).play('Cursor_idle');
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            this.body.setSize(sprite.width,sprite.height)
        }, this); 

        this.color = 0x00ff00;
        this.thickness =5;
        this.alpha =0.5;
        this.isDrag=false;
        this.setDragZone(scene,0,0);
    }

    setDragZone(scene,x,y){
        this.graphics = scene.add.graphics();
        scene.input.on('pointermove', function (pointer) {
            this.setPosition(pointer.x, pointer.y);
            if (this.isDown==true){
                this.isDrag = true;
                this.play('Cursor_drag');
                this.graphics.clear();
                this.graphics.lineStyle(this.thickness, this.color, this.alpha);
                this.graphics.strokeRect(pointer.downX, pointer.downY, pointer.x - pointer.downX, pointer.y - pointer.downY);
            }
        }.bind(this));

        scene.input.on('pointerdown', function (pointer) {
            this.isDown = true;
            this.isDrag = false;
        }.bind(this));
    
        scene.input.on('pointerup', function (pointer) {
            this.setScale(3);
            this.isDown = false;
            this.graphics.clear();
            if(this.isDrag){
                this.play('Cursor_idle');
                EMITTER.emit("pointerDrag", {x:pointer.downX, y:pointer.downY, width:pointer.x - pointer.downX, height:pointer.y - pointer.downY});
            }else{
                this.play('Cursor_click');
                scene.tweens.add({
                    targets: this,
                    scale: this.scale-1,
                    duration: 100,
                    yoyo: true,
                    onComplete: function (tween) {
                        this.setScale(3);
                        this.play('Cursor_idle');
                    }.bind(this),
                });

                EMITTER.emit("pointerUp", {x:pointer.x, y:pointer.y});
            }
            this.isDrag = false;
        }.bind(this));
    }
}