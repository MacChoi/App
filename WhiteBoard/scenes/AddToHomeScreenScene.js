class AddToHomeScreenScene extends Phaser.Scene {
    constructor(game){
        super({
            key:'AddToHomeScreenScene',
        });
        game.scene.add('AddToHomeScreenScene',this,true);
    }

    onAddToHomeScreen() {
        window.addToHomeScreenEvent.prompt();
        window.addToHomeScreenEvent.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted');
          } else {
            console.log('User dismissed');
          }
        })
    }

    onRelease(){
        this.textures.remove('icon');
        this.scene.stop('AddToHomeScreenScene');
        this.scene.destroy('AddToHomeScreenScene');
    }

    preload (){
        this.load.image('icon', 'assets/images/icons/icon_192x192.png');
    }

    create(){
        const WIDTH = GAME.config.width;
        const HEIGHT = GAME.config.height;

        var graphics = this.add.graphics();
        graphics.fillStyle(0xcccccc);
        graphics.fillRoundedRect(0, 0, WIDTH/2, 192, 32);
        graphics.fillPath();

        const makeGraphics = this.make.graphics();
        makeGraphics.fillStyle(0xffffff);
        makeGraphics.fillRoundedRect(0, 0, 192, 192, 32);
        makeGraphics.fillPath();
        const mask = makeGraphics.createGeometryMask();
        var icon=this.add.image(0,0,'icon').setOrigin(0).setMask(mask);
        var AddtoHomeScreen = this.add.text(icon.width + 10, 40, 'Add to Home Screen', { font: '20px Courier', fill: '#000000' }).setShadow(1, 1, '#ffffff');
        var close = this.add.text(icon.width + 90, icon.height-50, 'Close', { font: '20px Courier', fill: '#000000' }).setShadow(1, 1, '#ffffff');
        
        this.setButton(AddtoHomeScreen,()=>{
            addToHomeScreen();
        });
        this.setButton(close,()=>{
            this.release();
        });

    }

    setButton(btn,callback){
        const color = 0xcccccc;
        const donw_alpha = 1;
        btn.setInteractive();
        btn.on('pointerover', function (event) {
            btn.setTint(color);
            btn.setAlpha(donw_alpha);
        });
        btn.on('pointerout', function (event) {
            btn.clearTint();
            btn.setAlpha(1);
        });
        btn.on('pointerdown', function (event) {
            btn.setTint(color);
            btn.setAlpha(donw_alpha);
        });
        btn.on('pointerup', function (event) {
            callback();
        });
    }
}