
class ClockScene extends Phaser.Scene{
    create(){
        this.delay =1000;
        this.timer = this.time.addEvent({ delay: this.delay,
            callback: this.onTimerEvent, callbackScope: this, loop: true });
        
        var graphics = this.make.graphics({x: 0, y: 0, add: false});
        graphics.lineStyle(10, 0x00ff00, 1);
        graphics.strokeCircle(WIDTH/2,HEIGHT/2, 300);
        graphics.generateTexture("bg");
        graphics.clear();

        graphics.fillStyle(0xff0000, 1);
        graphics.fillRoundedRect(0, 0, 20, 100, 5);
        graphics.generateTexture("hour");
        graphics.clear();

        graphics.fillStyle(0x00ffff, 1);
        graphics.fillRoundedRect(0, 0, 10, 200, 5);
        graphics.generateTexture("min");
        graphics.clear();

        graphics.fillStyle(0x000000, 1);
        graphics.fillRoundedRect(0, 0, 5, 250, 5);
        graphics.generateTexture("sec");
        graphics.clear();

        this.bg=this.add.image(5,5,'bg').setOrigin(0);
   
        this.hour=this.add.image(WIDTH/2,HEIGHT/2,'hour').setOrigin(0);
        this.min=this.add.image(WIDTH/2,HEIGHT/2,'min').setOrigin(0);
        this.sec=this.add.image(WIDTH/2,HEIGHT/2,'sec').setOrigin(0);
    
        this.textTime = this.add.text(80, 0, '00:00:00', { font: '120px Courier', fill: '#00ff00' });
    }

    onTimerEvent(){
        var day = new Date();
        var hh = day.getHours();
        var mm = day.getMinutes();
        var ss = day.getSeconds();

        var hhPad = Phaser.Utils.String.Pad(hh, 2, '0', 1);
        var mmPad = Phaser.Utils.String.Pad(mm, 2, '0', 1);
        var ssPad = Phaser.Utils.String.Pad(ss, 2, '0', 1);
        this.textTime.text= hhPad + ":" + mmPad+":" +ssPad;
        
        this.hour.angle=hh* 30 - 180;
        this.min.angle=mm* 6 -180;
        this.sec.angle=ss* 6 -180;
    }
}