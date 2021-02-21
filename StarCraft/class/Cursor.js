class Cursor{
    static isDrag = false;
    static isZone = false;
    static graphics;
    static color = 0x00ff00;
    static thickness =1;
    static alpha =0.5;
    static sprite;
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){
        var sprite = scene.physics.add.sprite(x,y).play('cursor_idle').setScale(2).setDepth(1);
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
            if(Cursor.isZone)return;
            Cursor.isDrag = true;
        });
    
        scene.input.on('pointerup', function () {
            Cursor.isDrag = false;
            Cursor.graphics.clear();
            sprite.play('cursor_idle');
        });

        Cursor.sprite = sprite;
        return sprite;
    }

    static setZone(scene,x,y){
        Cursor.isZone = false;
        var topZone =scene.add.zone(x,y).setName('topZone').setSize(WIDTH,100).setOrigin(0).setInteractive();
        var bottomZone =scene.add.zone(x+325,HEIGHT-250).setName('bottomZone').setSize(WIDTH-600,100).setOrigin(0).setInteractive();
        var leftZone =scene.add.zone(x,100).setName('leftZone').setSize(100,370).setOrigin(0).setInteractive();
        var rightZone =scene.add.zone(x+WIDTH-100,100).setName('rightZone').setSize(100,370).setOrigin(0).setInteractive();
        
        scene.input.on('gameobjectout', function (pointer, gameObject) {
            Cursor.isZone = false;
            if(gameObject.name == 'topZone')Cursor.sprite.play('cursor_idle');
            else if(gameObject.name == 'bottomZone')Cursor.sprite.play('cursor_idle');
            else if(gameObject.name == 'leftZone')Cursor.sprite.play('cursor_idle');
            else if(gameObject.name == 'rightZone')Cursor.sprite.play('cursor_idle');
        });
        
        scene.input.on('gameobjectover', function (pointer, gameObject) {
            // Cursor.isZone = true;
            if(gameObject.name == 'topZone')Cursor.sprite.play('cursor_top');
            else if(gameObject.name == 'bottomZone')Cursor.sprite.play('cursor_bottom');
            else if(gameObject.name == 'leftZone')Cursor.sprite.play('cursor_left');
            else if(gameObject.name == 'rightZone')Cursor.sprite.play('cursor_right');
        });

        scene.physics.world.enable(topZone);
        scene.physics.world.enable(bottomZone);
        scene.physics.world.enable(leftZone);
        scene.physics.world.enable(rightZone);

        var dragZone =scene.add.zone(x+100,y+100).setSize(WIDTH-200,HEIGHT-350).setOrigin(0);
        scene.physics.world.enable(dragZone);
     
        var overlapDragZone = (cursor,zone) =>{
            // Cursor.sprite.play('cursor_idle');
        }
    
        scene.physics.add.overlap(Cursor.sprite,dragZone,overlapDragZone,null,this);
    
        var miniMapZone =scene.add.zone(x+10,y+HEIGHT-250).setSize(313, 250).setOrigin(0);
        scene.physics.world.enable(miniMapZone);
     
        var overlapMiniMapZone = (cursor,zone) =>{
            // Cursor.sprite.play('cursor_idle');
        }
    
        scene.physics.add.overlap(Cursor.sprite,dragZone,overlapMiniMapZone,null,this);
    } 
}