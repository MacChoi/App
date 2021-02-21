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
            if(Cursor.isZone)return;
            sprite.setPosition(pointer.x, pointer.y);

            if (Cursor.isDrag==true){
                sprite.play('cursor_drag');
                Cursor.graphics.clear();
                Cursor.graphics.lineStyle(Cursor.thickness, Cursor.color, Cursor.alpha);
                Cursor.graphics.strokeRect(pointer.downX, pointer.downY, pointer.x - pointer.downX, pointer.y - pointer.downY);
            }
        });

        scene.input.on('pointerdown', function (pointer) {
            // if(Cursor.isZone)return;
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
        var miniMapZone =scene.add.zone(x+10,y+HEIGHT-260).setSize(250, 250).setOrigin(0);
        scene.physics.world.enable(miniMapZone);
        miniMapZone.on('pointerdown', function (pointer) {

        });
        
        var scroll=10;
        var zoneTable=[
            [x+100,y,WIDTH-200,20,"cursor_top",0,-scroll,0],
            [x+325,HEIGHT-250,WIDTH-650,20,"cursor_bottom",0,scroll],
            [x+100,HEIGHT-350,WIDTH-1100,20,"cursor_bottom",0,scroll],
            [x+WIDTH-300,HEIGHT-350,WIDTH-1070,20,"cursor_bottom",0,scroll],
            [x,100,20,200,"cursor_left",-scroll,0],
            [x+WIDTH-20,100,20,220,"cursor_right",scroll,0],
            [x,y,70,70,"cursor_leftUp",-scroll,-scroll],
            [x,HEIGHT-400,70,70,"cursor_leftDown",-scroll,scroll],
            [x+WIDTH-70,y,70,70,"cursor_rightUp",scroll,-scroll],
            [x+WIDTH-70,HEIGHT-380,70,70,"cursor_rightDown",scroll,scroll],
        ];

        zoneTable.forEach(function(item,index){
            var zone =scene.add.zone(zoneTable[index][0],zoneTable[index][1])
            .setSize(zoneTable[index][2],zoneTable[index][3])
            .setOrigin(0).setInteractive()
            .setName(zoneTable[index][4]);

            scene.physics.world.enable(zone);
            zone.setInteractive().on('pointerdown', function (pointer) {
                Cursor.isZone = true;
                Cursor.sprite.play(zone.name);
            });

            zone.setInteractive().on('pointermove', function (pointer) {
                if (pointer.isDown){
                    Cursor.isZone = true;
                    Cursor.sprite.play(zone.name);

                    EventEmitter.emit("moveCursorCamera", zoneTable[index][5],zoneTable[index][6]);
                }
            });
            
            zone.setInteractive().on('pointerup', function (pointer) {
                Cursor.isZone = false;
            });

            zone.setInteractive().on('pointerout', function (pointer) {
                Cursor.isZone = false;
            });
        });
    } 
}