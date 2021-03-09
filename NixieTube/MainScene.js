class MainScene extends Phaser.Scene {
    preload(){
        this.load.image('tube', 'tube.png');
        this.load.spritesheet('nixie', 'nixie.png', { frameWidth: 70, frameHeight: 116 });
    }

    create(){
        this.numbers = [];
        var radius = 70;
        var intensity = 1;
        var attenuation = 0.1;
        const spectrum = Phaser.Display.Color.ColorSpectrum(128);
        var color = spectrum[10];
        for (let i = 0; i <8; i++) {
            var light=this.add.pointlight(i * 80 + 40, HEIGHT/2, 0, radius, intensity);
            light.attenuation = attenuation;
            light.color.setTo(color.r, color.g, color.b);
            this.add.image(i * 80 + 40, HEIGHT/2, 'tube');

            this.numbers.push(this.add.image(i * 80 + 40, HEIGHT/2, 'nixie', '10').setTint(0xff0000));
            this.numbers[i].setAlpha(0.5);
            this.numbers[i].setTintFill(0xff0000, 0xffff00, 0xff0000, 0xff0000,0xff0000);
            this.tweens.add({
                targets: this.numbers[i],
                alpha:1,    
                duration:100,
                yoyo:true,
                repeat:-1,
            });
        }
      
        this.timer = this.time.addEvent({ delay: 1000,
            callback: this.onTimerEvent, callbackScope: this, loop: true });
    }

    onTimerEvent(){
        var day = new Date();
        var hh = day.getHours();
        var mm = day.getMinutes();
        var ss = day.getSeconds();

        var hhPad = Phaser.Utils.String.Pad(hh, 2, '0', 1);
        var mmPad = Phaser.Utils.String.Pad(mm, 2, '0', 1);
        var ssPad = Phaser.Utils.String.Pad(ss, 2, '0', 1);
        var len = hhPad + mmPad + ssPad;
        const table=[0,1,3,4,6,7];
        for (let i = 0; i < 6; i++) {
            if(this.numbers[table[i]].frame.name != len[i]){
                this.numbers[table[i]].setFrame(len[i]);
            }
        }
    }
}