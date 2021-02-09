class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.startX=300;
        this.startY=-100;
        this.tWidth = 100;
        this.tHeight = 100;
        this.tType = 0;
        this.tRotate = 0;
        this.isRotate = false;
        this.isDown= false;
        this.checkSpeed = 100;

        this.indexCheckArray =0;
    }

    preload(){
        for (var i = 0; i < 5; i++) {
            this.load.json(""+i, './assets/data/'+ i +'.json');
        }

        this.load.setPath('./assets/images');
        this.load.image('tile', 'tile/tile.png');
    }

    create(){
        const rect = new Phaser.Geom.Rectangle(0, -200, game.scale.baseSize.width, game.scale.baseSize.height +200);
        this.tGroup = this.physics.add.group({ 
            key: 'tile', frameQuantity: 60
        });
        Phaser.Actions.PlaceOnRectangle(this.tGroup.getChildren(), rect);
        this.destroyGroup= this.add.group(0,0);
        this.tContainer = this.add.container(0,0);

        eventsCenter.on('keyup', this.onKeyCode, this);
        
        this.newTile(this.startX,this.startY, Phaser.Math.Between(0, 4));
        this.moveDownTile(this.startX,this.startY);
    }
 
    onKeyCode (event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.checkTile(this.tContainer.x- this.tWidth,this.tContainer.y,
                    function (checksum){
                        console.log("checksum " + checksum)
                        if(checksum==0)
                        this.tContainer.setPosition(this.tContainer.x-= this.tWidth,this.tContainer.y );
                }.bind(this));

            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.checkTile(this.tContainer.x+ this.tWidth,this.tContainer.y,
                    function (checksum){
                        console.log("checksum " + checksum)
                        if(checksum==0)
                        this.tContainer.setPosition(this.tContainer.x+= this.tWidth,this.tContainer.y );
                }.bind(this));
            break;
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
      
            break;
 
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.rotateTile();
            break;
            case Phaser.Input.Keyboard.KeyCodes.SPACE:
                this.checkTile(this.tContainer.x,this.tContainer.y,function (checksum){});
            break;   
        }
    }
    
    newTile(tx,ty,type){
        this.tType = type;
        this.tContainer.x = tx;
        this.tContainer.y = ty;
        var json = this.cache.json.get(""+this.tType);
        this.tContainer.each(function(obj){
            obj.destroy();
        }.bind(this));
       
        this.tContainer.setPosition(tx,ty);
        this.color = Phaser.Display.Color.HSVColorWheel()[50 * type].color;
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                if(json.tile[this.tRotate][j][i] == 0)continue;
                var image = this.add.image((i*this.tWidth),(j*this.tHeight), "tile");
                image.setTint(this.color);
                this.tContainer.add(image);
            }
        }

        this.checkTile(tx,ty,
            function (checksum){
                if(checksum>0){
                    
                    alert("Game Over!!!");
                    this.resetGame();
                }
        }.bind(this));
    }

    addTile(){
        this.tContainer.each(function(obj){
            var image = this.physics.add.image(this.tContainer.x+obj.x,this.tContainer.y+obj.y, "tile");
            image.setTint(this.color);

            this.tGroup.add(image);
            this.destroyGroup.add(image);       
        }.bind(this));
    }

    rotateTile(){
        console.log("rotateTile ",this.tType);
        this.newTile(this.tContainer.x,this.tContainer.y,this.tType);
        this.tRotate = this.tRotate < 3 ?this.tRotate+1:0;
    }

    moveDownTile(px,py){
        this.tween = this.tweens.add({
            targets:this.tContainer,
            y:this.tContainer.y + this.tHeight,
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                this.checkTile(this.tContainer.x,this.tContainer.y + this.tHeight,
                    function (checksum){
                        console.log("moveDownTile checksum " + checksum)
                        if(checksum>0){
                            this.tween.stop();
                            this.addTile();
                            
                            this.tContainer.setPosition(this.startX,this.startY);
                            this.tRotate = 0;
                            this.newTile(this.startX,this.startY, Phaser.Math.Between(0, 4));      
                            this.moveDownTile(this.startX,this.startY);
                        }else{
                            this.moveDownTile(this.tContainer.x,this.tContainer.y);
                        }
                }.bind(this));
            }.bind(this)
        })
    }

    checkTile(px,py,callback){
        new TweensCheck(this,px,py,this.tContainer.list,function (checksum){
            callback(checksum);
        }.bind(this))
    }

    resetGame(){
        this.destroyGroup.children.each(function(item) {
            item.destroy();
        }, this);
    }
}