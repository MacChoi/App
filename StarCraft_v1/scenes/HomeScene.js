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

        this.galaxy=this.add.image(0,0,'galaxy').setAlpha(0.5).setScale(2);
        this.planet=this.add.image(0,0,'planet').setScale(2);
       
        this.anims.create({ key: 'ani_fight', 
        frames: this.anims.generateFrameNames('fight', { prefix: 'single', end: 34, zeroPad: 2 }), repeat: -1 ,frameRate:10});
        this.fight=this.add.sprite(0, 0).setOrigin(0,0).setScale(2);
        this.fight.play('ani_fight');
        
        this.anims.create({ key: 'ani_satellite', 
        frames: this.anims.generateFrameNames('satellite', { prefix: 'multi', end: 49, zeroPad: 2 }), repeat: -1 ,frameRate:10});
        this.satellite = this.add.container(0, 0);
        this.satellite.add(this.add.sprite(0, 100).setOrigin(0,0).setScale(1.5).play('ani_satellite'));
        this.satellite.add(this.add.image(220, 335,'satellite','mul-tail').setOrigin(0,0).setScale(1.5));

        this.nav_bar=this.add.tileSprite(0, 0, WIDTH , 50, 'bar').setOrigin(0, 0);
        this.logo=this.add.image(WIDTH/2, 0,'logo');
        this.menu=new Button(this,0, 0,'menu','menu').setOrigin(-0.5, 0.5).setScale(2);
        this.icon=new Button(this,0, 0,'icon','icon').setOrigin(1.5, 0.5).setScale(2);

        this.menu_bg=this.add.image(0,0,'menu_bg').setAlpha(0.5).setOrigin(0).setScale(1).setFlipX(true);
        this.onResize();

        this.tweens.add({
            targets: this.galaxy,
            angle: 360,
            duration: 100000,
            repeat:-1
        });
    }

    onResize(e){
        this.nav_bar.width=WIDTH;
        this.nav_bar.height=HEIGHT/10;
        this.bg.width=WIDTH;
        this.bg.height=HEIGHT;
  
        this.menu_bg.x=-this.menu_bg.width;
        this.menu_bg.y=this.nav_bar.height;
        Phaser.Display.Align.In.TopLeft(this.satellite, this.bg);
        Phaser.Display.Align.In.TopCenter(this.fight, this.bg);
        Phaser.Display.Align.In.BottomLeft(this.planet, this.bg);
        Phaser.Display.Align.In.BottomRight(this.galaxy, this.bg);

        Phaser.Display.Align.In.LeftCenter(this.menu, this.nav_bar);
        Phaser.Display.Align.In.RightCenter(this.icon, this.nav_bar);
        Phaser.Display.Align.In.Center(this.logo, this.nav_bar);
    }

    onButton(e){
        if(e.id== "menu"){
            if(this.menu_bg.x<0){
                this.tweens.add({
                    targets: this.menu_bg,
                    x: 0,
                    ease: 'Power2',
                    duration: 1000,
                });
            }else{
                this.tweens.add({
                    targets: this.menu_bg,
                    x: -this.menu_bg.width,
                    ease: 'Power2',
                    duration: 1000,
                });
            }  
        }
        else if(e.id== "icon"){
            if(this.menu_bg.x<0){
                this.tweens.add({
                    targets: this.menu_bg,
                    x: 0,
                    ease: 'Power2',
                    duration: 1000,
                });
            }else{
                this.tweens.add({
                    targets: this.menu_bg,
                    x: -this.menu_bg.width,
                    ease: 'Power2',
                    duration: 1000,
                });
            }  
        }
        console.log(e)
    }
}