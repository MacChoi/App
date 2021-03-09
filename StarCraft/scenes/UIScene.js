class UIScene extends Phaser.Scene {
    constructor(){
        super({
            key:'UIScene',
        });
    }

    create(){
        this.graphics = this.add.graphics();
        var gameScene=this.scene.get('GameScene');
        this.minimap = gameScene.cameras.add(20, HEIGHT-450, WIDTH*0.2, HEIGHT*0.3).setZoom(0.2).setName('mini');
        this.minimap.ignore(GameScene.group);

        var ui=this.add.sprite(0, 0, 'uiBg').setScale(5);
        Phaser.Display.Align.In.BottomCenter(ui, gameScene.bg);
        this.setButton(WIDTH-290,HEIGHT-300);
        new Cursor(this,50,50);

        this.data.set('minerals', 300);
        this.data.set('gas', 500);
        this.data.set('supply', 100);
        this.data.set('MaxSupply', 200);
        new Resource(this,WIDTH-450,50,'ui');

    }

    update(){
        this.graphics.clear();
        GameScene.group.children.iterate(function (obj) {
            var scale=0.2;
            this.graphics.fillStyle(0x00ff00, 2);
            this.graphics.fillRect(20 +obj.x*scale, HEIGHT-450+obj.y*scale, 10, 10);
        }.bind(this));
    }

    setButton(x,y){
        var group = this.add.group();
        var button_table=["1","2","3","4","5"];
        for (var i = 0; i < button_table.length; i++) {
            var button=new Button(this,0,0,'button').setFrame(button_table[i]);
            group.add(button);
        }

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 3,
            cellWidth: 135,
            cellHeight: 125,
            x: x,
            y: y
        });
    }
}