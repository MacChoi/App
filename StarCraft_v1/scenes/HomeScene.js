class HomeScene extends Phaser.Scene {
    constructor(){
        super({
            key:'HomeScene',
        });
    }

    create(){
        EMITTER.on('onresize', this.onResize, this);
        EMITTER.on('button', this.onButton, this);
        this.bg=this.add.tileSprite(0, 0, WIDTH , HEIGHT, 'bg').setOrigin(0, 0);

        const NAV_HEIGHT = 50;
        this.planet=this.add.image(WIDTH/2, HEIGHT/2,'planet').setOrigin(0,0).setScale(3).setAlpha(0.5);
        
        this.anims.create({ key: 'ani_galaxy', 
        frames: this.anims.generateFrameNames('galaxy', { prefix: 'single', end: 34, zeroPad: 2 }), repeat: -1 ,frameRate:10});
        this.galaxy=this.add.sprite(WIDTH, HEIGHT).setOrigin(0,0).setScale(2);
        this.galaxy.play('ani_galaxy');

        this.anims.create({ key: 'ani_satellite', 
        frames: this.anims.generateFrameNames('satellite', { prefix: 'multi', end: 49, zeroPad: 2 }), repeat: -1 ,frameRate:10});
        this.satellite=this.add.sprite(0, 100).setOrigin(0,0).setScale(1.5);
        this.satellite.play('ani_satellite');
        this.add.image(220, 335,'satellite','mul-tail').setOrigin(0,0).setScale(1.5);

        this.nav_bar=this.add.tileSprite(0, 0, WIDTH , NAV_HEIGHT, 'bar').setOrigin(0, 0);
        this.logo=this.add.image(WIDTH/2, 0,'logo');
        this.menu=new Button(this,0, 0,'menu','menu').setOrigin(-0.5, 0.5).setScale(2);
        this.icon=new Button(this,0, 0,'icon','icon').setOrigin(1.5, 0.5).setScale(2);

        this.menu_bg=this.add.image(0, NAV_HEIGHT,'menu_bg').setAlpha(0.5).setOrigin(0, 0).setScale(1).setFlipX(true);
 
        this.onResize();
    }

    onResize(e){
        this.nav_bar.width=WIDTH;
        this.bg.width=WIDTH;this.bg.height=HEIGHT;
        this.galaxy.setPosition(0, 0);
        this.planet.setPosition(WIDTH/2, HEIGHT/2);
        this.logo.setPosition(WIDTH/2, HEIGHT/2);

        Phaser.Display.Align.In.LeftCenter(this.menu, this.nav_bar);
        Phaser.Display.Align.In.RightCenter(this.icon, this.nav_bar);
        Phaser.Display.Align.In.Center(this.logo, this.nav_bar);
    }

    onButton(e){
        console.log(e)
    }
}