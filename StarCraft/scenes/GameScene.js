class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key:'GameScene',
        });
    }

    create(){
        var bg=this.add.image(WIDTH/2, HEIGHT/2, 'bg').setScale(5);
        
        var ui=this.add.image(0, 0, 'ui').setScale(5);
        Phaser.Display.Align.In.BottomCenter(ui, bg);
        
        new Cursor(this,50,50);
        new Marine(this,750,350);
    }
}