class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key:'GameScene',
        });
    }

    create(){
        this.bg = this.add.image(WIDTH/2, HEIGHT/2, 'bg').setScale(5);
        var ui=this.add.sprite(0, 0, 'ui').setScale(5);
        Phaser.Display.Align.In.BottomCenter(ui, this.bg);
       
        this.setButton(WIDTH-290,HEIGHT-300);
        new Marine(this,750,350);
        new Cursor(this,50,50);
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