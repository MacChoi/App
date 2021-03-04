class Marine extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        scene.add.existing(this,true);
        scene.physics.world.enable(this);
        scene.anims.fromJSON(scene.cache.json.get(this.constructor.name));
        
        this.scene = scene;
        this.setScale(3).setDepth(1).play('Marine_idle');
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (animation, frame, gameObject) {
            this.body.setSize(this.width,this.height);
        }.bind(this), this);

        EMITTER.on('pointerUp', this.onPointerup, this);
        EMITTER.on('pointerDrag', this.onPointerDrag, this);
    }

    onPointerup(pointer){
        var angle = Phaser.Math.Angle.Between(pointer.x, pointer.y,this.x, this.y)- Math.PI / 2;
        var distance = Phaser.Math.Distance.Between(pointer.x, pointer.y,this.x, this.y);
        console.log(angle);
        this.setRotation(angle);
        this.scene.tweens.add({
            targets: this,
            x:pointer.x,
            y:pointer.y,
            duration: distance,
            onComplete: function (tween) {
              
            }.bind(this),
        });
    }

    onPointerDrag(pointer){
        console.log(pointer)
    }
}