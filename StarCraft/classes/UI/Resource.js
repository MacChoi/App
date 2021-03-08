class Resource extends Phaser.GameObjects.Image {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        scene.add.existing(this);
        this.setScale(3.5).setDepth(1);
        this.setInteractive();

        scene.add.image(x+0, y, 'ui', 1).setScale(3);
        scene.add.image(x+150,y, 'ui', 2).setScale(3);
        scene.add.image(x+300,y, 'ui', 3).setScale(3);

        scene.add.bitmapText(x+30,y-20, 'font', scene.data.get('minerals'))
        .setFontSize(30);
        scene.add.bitmapText(x+180,y-20, 'font', scene.data.get('gas'))
        .setFontSize(30);
        scene.add.bitmapText(x+330,y-20, 'font', scene.data.get('supply') +'/'+scene.data.get('MaxSupply'))
        .setFontSize(30);
    }
}