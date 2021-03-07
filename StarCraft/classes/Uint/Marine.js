class Marine extends Unit {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
    }

    onPointerup(pointer){
        if(this.tweens)this.tweens.stop();
        var distance = Phaser.Math.Distance.Between(pointer.x, pointer.y,this.x, this.y);
        // this.aniPlay('move');
        this.tweens=this.scene.tweens.add({
            targets: this,
            x:pointer.x,
            y:pointer.y,
            duration: distance *5,
            onUpdate: function (tween) {
                this.aniPlay('move');
            }.bind(this),
            onComplete: function (tween) {
                this.aniPlay('idle');
            }.bind(this),
        });
    }
}