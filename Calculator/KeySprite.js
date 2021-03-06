class KeySprite extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,key,num) {
        super(scene,x,y,key);
        this.num=num;
        scene.add.existing(this);
        this.setInteractive();
        this.on('pointerover', function (event) {
            this.setTint(0xcccccc);
        });
        this.on('pointerout', function (event) {
            this.clearTint();
        });
        this.on('pointerdown', function (event) {
            this.setTint(0x00ff00);
            EMITTER.emit("keydown", {num:this.num});
        });
    }
}