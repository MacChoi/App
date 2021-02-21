class UIScene extends Phaser.Scene{
    constructor(){
        super({
            key:'UIScene',
        });
    }
    create(){
        EventEmitter.on('onCursorZone', this.onCursorZone, this);
        this.add.image(0,HEIGHT-330, 'ui').setOrigin(0).setScale(3.3);
        MiniMap.create(this,10,HEIGHT-250);
        Cursor.create(this,100,100); 
        
        this.miniMapCursorRect = this.physics.add.image(10,HEIGHT-260,'rect')
        .setScale(4).setInteractive();
        this.miniMapCursorRect.setCollideWorldBounds(true);
        this.miniMapCursorRect.body.setBoundsRectangle(new Phaser.Geom.Rectangle(10,HEIGHT-260,250, 250));
        
        var miniMapZone =this.add.zone(10,HEIGHT-260).setSize(250, 250)
        .setOrigin(0).setInteractive();
        miniMapZone.on('pointermove', function (pointer) {
            if(pointer.isDown){
                this.miniMapCursorRect.x=pointer.x;
                this.miniMapCursorRect.y=pointer.y;

                EventEmitter.emit("onMiniMapZone",this.miniMapCursorRect.x,this.miniMapCursorRect.y);
            
                Cursor.isDrag = false;
                Cursor.graphics.clear();
                Cursor.sprite.play('cursor_idle');
            }
        }.bind(this));

        miniMapZone.on('pointerdown', function (pointer) {
            this.miniMapCursorRect.x=pointer.x;
            this.miniMapCursorRect.y=pointer.y;

            EventEmitter.emit("onMiniMapZone",this.miniMapCursorRect.x,this.miniMapCursorRect.y);
        }.bind(this));
    }

    onCursorZone(x,y){
        this.miniMapCursorRect.x+=x;
        this.miniMapCursorRect.y+=y;
        EventEmitter.emit("onMiniMapZone",this.miniMapCursorRect.x,this.miniMapCursorRect.y);
    }
}