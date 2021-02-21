class UIScene extends Phaser.Scene{
    constructor(){
        super({
            key:'UIScene',
        });
    }
    create(){
        this.add.image(0,HEIGHT-330, 'ui').setOrigin(0).setScale(3.3);
        MiniMap.create(this,10,HEIGHT-250);
        var cursor= Cursor.create(this,100,100);
        Cursor.setZone(this,0,0);
    }
}