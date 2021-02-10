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
        this.checkSpeed = 1000;
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
        this.addGroup = this.physics.add.group({ 
            key: 'tile', frameQuantity: 60 
        });
        const rect = new Phaser.Geom.Rectangle(0, -300, game.scale.baseSize.width, game.scale.baseSize.height +300);
        Phaser.Actions.PlaceOnRectangle(this.addGroup.getChildren(), rect);

        this.destroyGroup= this.add.group(0,0);
        this.tContainer = this.add.container(0,0);

        eventsCenter.on('keyup', this.onKeyCode, this);
        
        this.newTile(this.startX,this.startY, Phaser.Math.Between(0, 4));
        // this.moveDownTile(this.startX,this.startY);

        this.timer = this.time.addEvent({ delay: this.checkSpeed,
            callback: this.onTimerEvent, callbackScope: this, loop: true });

    }
    
    onTimerEvent(){
        this.checkTile(this.tContainer.x,this.tContainer.y +this.tHeight,
            function (checksum){
                if(checksum==0)
                this.tContainer.setPosition(this.tContainer.x,this.tContainer.y +this.tHeight);
                else{
                    this.addTile();
                    this.tContainer.setPosition(this.startX,this.startY);
                    this.tRotate = 0;
                    this.newTile(this.startX,this.startY, Phaser.Math.Between(0, 4));      
                }
            }.bind(this)
        );
    }
 
    onKeyCode (event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.checkTile(this.tContainer.x- this.tWidth,this.tContainer.y,
                    function (checksum){
                        console.log("LEFT checksum " + checksum)
                        if(checksum==0)
                        this.tContainer.setPosition(this.tContainer.x-= this.tWidth,this.tContainer.y );
                }.bind(this));

            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.checkTile(this.tContainer.x+ this.tWidth,this.tContainer.y,
                    function (checksum){
                        if(checksum==0)
                        this.tContainer.setPosition(this.tContainer.x+= this.tWidth,this.tContainer.y );
                }.bind(this));
            break;
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.checkTile(this.tContainer.x,this.tContainer.y +this.tHeight,
                    function (checksum){
                        if(checksum==0)
                        this.tContainer.setPosition(this.tContainer.x,this.tContainer.y +this.tHeight);
                }.bind(this));
            break;
 
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.rotateTile();
            break;

            case Phaser.Input.Keyboard.KeyCodes.SPACE:
                this.checkTile(this.tContainer.x,this.tContainer.y,function (checksum){});
            break;   
        }
    }
    
    getJsonToArray(type,rotate){
        var array= new Array();
        var json = this.cache.json.get(""+type);
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                if(json.tile[rotate][j][i] == 0)continue;
                var data = {x:(i*this.tWidth),y:(j*this.tHeight)
                    , width:this.tWidth,height:this.tHeight}
                array.push(data);
            }
        }
        return array;
    }

    newTile(tx,ty,type){
        this.tType = type;
        this.tContainer.x = tx;
        this.tContainer.y = ty;
        this.tContainer.setPosition(tx,ty);
        this.tContainer.each(function(obj){
            obj.destroy();
        }.bind(this));
        this.color = Phaser.Display.Color.HSVColorWheel()[65 * type].color;
        var array=this.getJsonToArray(type,this.tRotate);
        array.forEach(function(obj){
            var image = this.add.image(obj.x,obj.y, "tile");
            image.setTint(this.color);
            this.tContainer.add(image);    
        }.bind(this));

        this.checkTile(tx,ty,
            function (checksum){
                if(checksum>0){
                    if(ty < 0){
                        alert("Game Over!!! ");
                        this.resetGame();
                    }
                }
            }.bind(this)
        );
    }

    addTile(){
        this.tContainer.each(
            function(obj){
                var image = this.physics.add.image(this.tContainer.x+obj.x,this.tContainer.y+obj.y, "tile");
                image.setTint(this.color);

                this.addGroup.add(image);
                this.destroyGroup.add(image);       
            }.bind(this)
        );
    }

    rotateTile(){
        this.checkRotateTile(
            function(checksum){
                if(checksum==0){
                    this.tRotate = this.tRotate < 3 ?this.tRotate+1:0;
                    this.newTile(this.tContainer.x,this.tContainer.y,this.tType);
                }
            }.bind(this)
        )
      }

    checkRotateTile(callback){
        var rotate = this.tRotate < 3 ?this.tRotate+1:0;
        var array=this.getJsonToArray(this.tType,rotate);
        var container = this.add.container(this.tContainer.x,this.tContainer.y);
        array.forEach(function(obj){
            var image = this.add.image(obj.x,obj.y, "tile");
            container.add(image);    
        }.bind(this));

        new TweensCheck(this,this.tContainer.x,this.tContainer.y,container,
            function (checksum){
                callback(checksum);
            }.bind(this)
        );

        container.each(function(item) {
            item.destroy();
        }, this);
    }

    checkTile(px,py,callback){
        new TweensCheck(this,px,py,this.tContainer,
            function (checksum){
                callback(checksum);
            }.bind(this)
        );
    }

    resetGame(){
        this.destroyGroup.children.each(
            function(item) {
                item.destroy();
            }
        );
    }
}