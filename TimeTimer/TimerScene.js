
class TimerScene extends Phaser.Scene{
    constructor(){
        super({
            key:'TimerScene',
            active:true
        })
    }
    
    preload(){
        this.load.audio('alarm','alarm.mp3');
    }

    create(){
        this.sound_alarm = this.sound.add('alarm',1, true);
        this.deg = -90;
        this.delay =1000;
        this.timer = this.time.addEvent({ delay: this.delay,
            callback: this.onTimerEvent, callbackScope: this, loop: true });
        
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 1);
        this.graphics.fillRect(10, 10, 10, 10);
        this.graphics.generateTexture("rect");
      
        const circle = new Phaser.Geom.Circle(600, 600, 300);
        this.group = this.add.group({ key: "rect" , frameQuantity: 12 });
        Phaser.Actions.PlaceOnCircle(this.group.getChildren(), circle);

        this.input.on('pointerdown', function (pointer) {
            this.deg = (360 / (2 * Math.PI)) 
            * Phaser.Math.Angle.Between(WIDTH/2, HEIGHT/2,pointer.x, pointer.y) + 90;
            if(this.deg < 0)this.deg += 360;
            this.deg-=90;
            this.deg =Math.round(this.deg);
        }.bind(this));
    }

    onTimerEvent(){
        this.draw();
    }

    draw(){
        if(this.deg == 270){
            this.sound_alarm.play();
            alert("알람");
            this.sound_alarm.stop();
        }

        this.deg+=1;
        this.graphics.clear();
        this.graphics.fillStyle(0xff0000, 1);
        this.graphics.slice(305, 305, 300, Phaser.Math.DegToRad(360-90), Phaser.Math.DegToRad(this.deg), true);
        this.graphics.fillPath();
    }
}