class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.cellWidth =33;
        this.cellHeight =33;
        this.isWhite =false;
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.image('bg', 'bg/bg.png');
        this.load.image('white', 'goStone/white.png');
        this.load.image('black', 'goStone/black.png');
    }
    create(){
        this.boardGroup = this.add.group({
            key:'bg',
            frameQuantity:100,
            gridAlign:{
                width:10,
                cellWidth:this.cellWidth,
                cellHeight:this.cellHeight,
                x:0,
                y:0
            }
        });

        this.input.on('pointerup',pointer =>{
            this.setCursor(pointer);
        });

        this.stoneGroup = this.add.group();
    }

    setCursor(pointer){
        if(this.isStone(pointer.x,pointer.y))return;
        var x= (pointer.x/this.cellWidth).toFixed() * this.cellWidth;
        var y= (pointer.y/this.cellHeight).toFixed() * this.cellHeight;
        var stone;
        if(this.isWhite == true){
            stone = this.physics.add.sprite(x,y,'white');
            this.input.setDefaultCursor('url(./assets/images/cursors/black.cur), pointer');
        }else{
            stone = this.physics.add.sprite(x,y,'black');
            this.input.setDefaultCursor('url(./assets/images/cursors/white.cur), pointer');
        }
        this.isWhite = !this.isWhite;
        this.stoneGroup.add(stone);

        new CheckStone(this,pointer.x,pointer.y);
    }

    clearStone(){
        this.stoneGroup.clear(true,true);
    }

    isStone(px,py){
        var x= (px/this.cellWidth).toFixed() * this.cellWidth;
        var y= (py/this.cellHeight).toFixed() * this.cellHeight;
        var overlapRect = this.physics.overlapRect(x -10,y-10,20,20);
        if(overlapRect.length >0)return overlapRect[0];
        return false;
    }
}