class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.startX=300;
        this.startY=0;
        this.tWidth = 100;
        this.tHeight = 100;
        this.tType = 0;
        this.tRotate = 0;
        this.isRotate = false;
        this.checkSpeed = 1000;
    }

    preload(){
        for (var i = 0; i < 5; i++) {
            this.load.json(""+i, './assets/data/'+ i +'.json');
        }

        this.load.setPath('./assets/images');
        this.load.image('tile', 'tile/tile.png');
    }

    create(){
        const rect = new Phaser.Geom.Rectangle(0, 0, game.scale.baseSize.width, game.scale.baseSize.height);
        this.tGroup = this.physics.add.group({ 
            key: 'tile', frameQuantity: 60
        });

        Phaser.Actions.PlaceOnRectangle(this.tGroup.getChildren(), rect);
        this.tContainer = this.add.container(0,0);
        // this.destroyContainer= this.add.container(0,0);
       
        this.newTile(this.startX,this.startY, Phaser.Math.Between(0, 4));
       
        eventsCenter.on('keyup', this.onKeyCode, this);
        // this.moveDownTile(this.startX,this.startY);
    }
 
    onKeyCode (event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.tContainer.setPosition(this.tContainer.x-= this.tWidth,this.tContainer.y );
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.tContainer.setPosition(this.tContainer.x+= this.tWidth,this.tContainer.y );
            break;
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.tContainer.setPosition(this.tContainer.x,this.tContainer.y+= this.tHeight );
            break;
            case Phaser.Input.Keyboard.KeyCodes.UP:
                this.scene.restart();
                // this.tContainer.setPosition(this.tContainer.x,this.tContainer.y-= this.tHeight );
            break;
            case Phaser.Input.Keyboard.KeyCodes.SPACE:
                this.isRotate =false;
                this.rotateTile();
            break;
        }
    }
    
    newTile(tx,ty,type){
        this.tType = type;
        this.tContainer.x = tx;
        this.tContainer.y = ty;
        var json = this.cache.json.get(""+type);
        this.tContainer.each(function(obj){
            obj.destroy();
        }.bind(this));
        this.tContainer.setPosition(tx,ty);
        this.color = Phaser.Display.Color.HSVColorWheel()[50 * type].color;
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                if(json.tile[this.tRotate][j][i] == 0)continue;
                var sprite = this.physics.add.sprite((j*this.tWidth),(i*this.tHeight), "tile");
                sprite.setTint(this.color);
                this.tContainer.add(sprite);

                this.physics.add.collider(sprite, this.tGroup,this.onTileHit,null,this);
                this.physics.add.collider(sprite, this.tBoundGroup,this.onTileBoundHit,null,this);
            }
        }
    }

    onTileHit(tile,tGroup){
        console.log("onTileHit ",tGroup.y)
        this.tContainer.x= this.pX;
        this.tContainer.y= this.pY;
        if(this.isRotate){
            this.tRotate = this.tRotate > 0 ?this.tRotate-1:3;
            this.newTile(this.tContainer.x,this.tContainer.y,this.tType);
        }else{
            // this.isHit =true;
            // if(tGroup.y <=100){
            //     alert("Game Over!!" +this.pY);
            //     this.tileAllContainer.each(function(obj){
            //         obj.destroy();
            //     }.bind(this));
            // }else{
            //     this.addTile();
            //     this.tween.stop();
                // this.pX = this.startX;
                // this.pY = this.startY;
             
            //     this.newTile(this.startX,this.startY, Phaser.Math.Between(0, 4));
            //     var y = this.tType == 0 ? this.tHeight : 0;
            //     this.tContainer.setPosition(this.startX,this.startY + y );
            //     this.moveDownTile(this.startX,this.startY);  
            //     this.isHit = false;
            // }
        }
    }

    addTile(){
        this.tContainer.each(function(obj){
            var sprite = this.physics.add.sprite(this.tContainer.x+obj.x,this.tContainer.y+obj.y, "tile");
            sprite.setTint(this.color);
            this.tGroup.add(sprite);
            this.tileAllContainer.add(sprite);
            this.physics.add.collider(sprite, this.tGroup,this.onTileHit,null,this);
        }.bind(this));
    }

    rotateTile(){
        this.isRotate = true;
        this.newTile(this.tContainer.x,this.tContainer.y,this.tType);
        this.tRotate = this.tRotate < 3 ?this.tRotate+1:0;
    }

    moveDownTile(px,py){
        this.tween = this.tweens.add({
            targets:this.tContainer,
            y:this.tContainer.y + this.tHeight,
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                this.moveDownTile(this.tContainer.x,this.tContainer.y);
            }.bind(this)
        })
    }

    update(){
        this.pX = this.tContainer.x;
        this.pY = this.tContainer.y;
    }
}