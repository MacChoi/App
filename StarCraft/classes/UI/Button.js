class Button extends Phaser.GameObjects.Image {
    constructor (scene,x,y,key,num) {
        super(scene,x,y,key);
        this.num=num;
        scene.add.existing(this);
        this.setScale(3.5).setDepth(1);
        this.setInteractive();

        this.color = 0x00ff00;
        const donw_alpha = 0.3;
        this.on('pointerout', function (event) {
            this.clearTint();
            this.setAlpha(1);
        });
        this.on('pointerdown', function (event) {
            this.setTint(this.color);
            this.setAlpha(donw_alpha);
            EMITTER.emit("keydown", {num:this.num});
        });
        this.on('pointerup', function (event) {
            this.clearTint();
            this.setAlpha(1);
        });
    }
}