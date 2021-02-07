class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key:'GameScene',
            active:true
        });
        this.tileWidth = 100;
        this.tileHeight = 100;
    }

    preload(){
        this.load.setPath('./assets/images');
        this.load.image('tile', 'tile/tile.png');
    }

    create(){
        const rect = new Phaser.Geom.Rectangle(20, -100, 1160, 2100);
        this.bgGroup = this.physics.add.group({ 
            key: 'tile', frameQuantity: 60, 
        });
        this.bgGroup.children.each(function (tile){
            tile.setImmovable();
        });
        Phaser.Actions.PlaceOnRectangle(this.bgGroup.getChildren(), rect);
        
        this.tileGroup = this.add.group();

        new Tile(this,400,100,'tile');
        //new Tile(this,400,450,'tile');
    }

    clearTile(){
        this.tileGroup.clear(true,true);
    }
}