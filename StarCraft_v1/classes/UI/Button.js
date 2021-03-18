class Button extends Phaser.GameObjects.Image {
    constructor (scene,x,y,key,id) {
        super(scene,x,y,key);
        this.id=id;
        scene.add.existing(this);
        this.setInteractive();

        this.color = 0x00ff00;
        const donw_alpha = 0.3;
        this.on('pointerover', function (event) {
            this.setTint(this.color);
            this.setAlpha(donw_alpha);
        });

        this.on('pointerout', function (event) {
            this.clearTint();
            this.setAlpha(1);
        });

        this.on('pointerdown', function (event) {
            this.setTint(this.color);
            this.setAlpha(donw_alpha);

            EMITTER.emit("button", {id:this.id});
        });
        this.on('pointerup', function (event) {
            this.clearTint();
            this.setAlpha(1);
        });
    }
}