class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.startX=300;
        this.startY=-100;
        this.blockWidth = 100;
        this.blockHeight = 100;
        this.blockType = 0;
        this.blockRotate = 0;
        this.checkSpeed = 200;
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
        this.blockContainer = this.add.container(0,0);

        eventsCenter.on('keyup', this.onKeyCode, this);
        
        this.newBlock(this.startX,this.startY, Phaser.Math.Between(0, 4));
        this.timer = this.time.addEvent({ delay: this.checkSpeed,
            callback: this.onTimerEvent, callbackScope: this, loop: true });

        this.clearBlockContainer = this.add.container(100,-1900);
        for (let i = 0; i < 9 ; i++) {
            var image = this.add.image(i * this.blockWidth,0, "tile");

            this.clearBlockContainer.add(image);
        }
    }
    
    onTimerEvent(){
        this.checkBlock(this.blockContainer.x,this.blockContainer.y +this.blockHeight,
            function (checksum){
                if(checksum==0){
                    this.blockContainer.setPosition(this.blockContainer.x,this.blockContainer.y +this.blockHeight);
                }
                else{
                    this.addBlock();
                    this.blockContainer.setPosition(this.startX,this.startY);
                    this.blockRotate = 0;
                    this.newBlock(this.startX,this.startY, Phaser.Math.Between(0, 4));      
                }
            }.bind(this)
        );

        this.checkClearBlock(100,1900);
    }
 
    onKeyCode (event){
        switch (event.keyCode) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.checkBlock(this.blockContainer.x- this.blockWidth,this.blockContainer.y,
                    function (checksum){
                        if(checksum==0)
                        this.blockContainer.setPosition(this.blockContainer.x-= this.blockWidth,this.blockContainer.y );
                }.bind(this));

            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.checkBlock(this.blockContainer.x+ this.blockWidth,this.blockContainer.y,
                    function (checksum){
                        if(checksum==0)
                        this.blockContainer.setPosition(this.blockContainer.x+= this.blockWidth,this.blockContainer.y );
                }.bind(this));
            break;
            case Phaser.Input.Keyboard.KeyCodes.DOWN:
                this.checkBlock(this.blockContainer.x,this.blockContainer.y +this.blockHeight,
                    function (checksum){
                        if(checksum==0)
                        this.blockContainer.setPosition(this.blockContainer.x,this.blockContainer.y +this.blockHeight);
                }.bind(this));
            break;
            case Phaser.Input.Keyboard.KeyCodes.A:
                this.rotateBlock(); 
            break  
        }
    }
    
    getJsonToArray(type,rotate){
        var array= new Array();
        var json = this.cache.json.get(""+type);
        for (var j = 0; j < 4; j++) {
            for (var i = 0; i < 4; i++) {
                if(json.tile[rotate][j][i] == 0)continue;
                var data = {x:(i*this.blockWidth),y:(j*this.blockHeight)
                    , width:this.blockWidth,height:this.blockHeight}
                array.push(data);
            }
        }
        return array;
    }

    newBlock(tx,ty,type){
        this.blockType = type;
        this.blockContainer.x = tx;
        this.blockContainer.y = ty;
        this.blockContainer.setPosition(tx,ty);
        this.blockContainer.each(function(obj){
            obj.destroy();
        }.bind(this));
        this.color = Phaser.Display.Color.HSVColorWheel()[65 * type].color;
        var array=this.getJsonToArray(type,this.blockRotate);
        array.forEach(function(obj){
            var image = this.add.image(obj.x,obj.y, "tile");
            image.setTint(this.color);
            this.blockContainer.add(image);    
        }.bind(this));

        this.checkBlock(tx,ty,
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

    addBlock(){
        this.blockContainer.each(
            function(obj){
                var image = this.physics.add.image(this.blockContainer.x+obj.x,this.blockContainer.y+obj.y, "tile");
                image.setTint(this.color);

                this.addGroup.add(image);
                this.destroyGroup.add(image);       
            }.bind(this)
        );
    }

    rotateBlock(){
        this.checkRotateBlock(
            function(checksum){
                if(checksum==0){
                    this.blockRotate = this.blockRotate < 3 ?this.blockRotate+1:0;
                    this.newBlock(this.blockContainer.x,this.blockContainer.y,this.blockType);
                }
            }.bind(this)
        )
    }

    checkRotateBlock(callback){
        var rotate = this.blockRotate < 3 ?this.blockRotate+1:0;
        var array=this.getJsonToArray(this.blockType,rotate);
        var container = this.add.container(this.blockContainer.x,this.blockContainer.y);
        array.forEach(function(obj){
            var image = this.add.image(obj.x,obj.y, "tile");
            container.add(image);    
        }.bind(this));

        new TweensCheck(this,this.blockContainer.x,this.blockContainer.y,
            this.blockWidth/4,this.blockHeight/4,
            container,
            function (checksum){
                callback(checksum);
            }.bind(this)
        );

        container.each(function(item) {
            item.destroy();
        });
    }

    checkBlock(x,y,callback){
        new TweensCheck(this,x,y,
            this.blockWidth/4,this.blockHeight/4,
            this.blockContainer,
            function (checksum){
                callback(checksum);
            }.bind(this)
        );
    }

    checkClearBlock(x,y){
        var check = new TweensCheck(this,x,y,
            this.blockWidth/4,this.blockHeight/4,
            this.clearBlockContainer,
            function (checksum){
                if(checksum>8){
                    var overlap=this.physics.overlapRect(x,y,this.blockWidth*8,this.blockHeight/4);
                    overlap.forEach(function(obj){  
                        obj.gameObject.destroy();
                    }.bind(this));
                }else if(checksum ==0){
                    var overlap=this.physics.overlapRect(x,y-this.blockHeight,this.blockWidth*8,this.blockHeight/4);
                    overlap.forEach(function(obj){  
                        obj.gameObject.y+=this.blockHeight;
                    }.bind(this));

                    if(overlap.lenght>0)this.checkClearBlock(x,y);
                    return;
                }
            }.bind(this)
        );
        if(y>50)this.checkClearBlock(x,y-this.blockHeight);
    }

    resetGame(){
        this.destroyGroup.children.each(
            function(item) {
                item.destroy();
            }
        );
    }
}