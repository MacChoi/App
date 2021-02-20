class Cursor{
    static isDrag = false;
    static graphics;
    static color = 0x00ff00;
    static thickness = 2;
    static alpha = 1;
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){
        var sprite = scene.physics.add.sprite(x,y).play('cursor_idle').setScale(2);
        sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            sprite.body.setSize(sprite.width,sprite.height);
        }, this);
        
        this.graphics = scene.add.graphics();
        scene.input.on('pointermove', function (pointer) {
            sprite.setPosition(pointer.x, pointer.y);

            if (Cursor.isDrag==true){
                sprite.play('cursor_drag');
                Cursor.graphics.clear();
                Cursor.graphics.lineStyle(Cursor.thickness, Cursor.color, Cursor.alpha);
                Cursor.graphics.strokeRect(pointer.downX, pointer.downY, pointer.x - pointer.downX, pointer.y - pointer.downY);
            }
        });

        scene.input.on('pointerdown', function (pointer) {
            Cursor.isDrag = true;
        });
    
        scene.input.on('pointerup', function () {
            Cursor.isDrag = false;
            Cursor.graphics.clear();
            sprite.play('cursor_idle');
        });
    
        return sprite;
    }
}