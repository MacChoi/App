class QRScene extends Phaser.Scene {
    constructor(){
        super({
            key:'QRScene',
        });
    }

    create(){
        this.qrcode = new QRCode(document.getElementById("qrcode"), {
            width : WIDTH/2,
            height : WIDTH/2
        });

        EMITTER.on('onresize', this.onResize, this);
        
        this.nav = this.add.rectangle(0, 0, WIDTH, 30, 0x6666ff).setOrigin(0);
        this.title =this.add.text(0,0,"QRCode",{ fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
        
        this.create = this.add.text(0,0," 만들기",{ fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setOrigin(0.5,0);
        this.create.setInteractive();
        this.create.on('pointerup', function (event) {
            this.makeCode ();
        }.bind(this));

        this.onResize();
    }

    onResize(e){
        this.nav.width=WIDTH;
        Phaser.Display.Align.In.Center(this.title, this.nav);
        Phaser.Display.Align.In.LeftCenter(this.create, this.nav);
    }
    
    makeCode () {		
        var elText = document.getElementById("urlText");
        this.qrcode.makeCode(elText.value);
    }
}