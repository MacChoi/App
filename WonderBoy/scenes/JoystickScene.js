class JoystickScene extends Phaser.Scene{
    constructor(){
        super({
            key:'JoystickScene',
            active:true
        });
 
        this.delay = 50;
    }
  
    create(){
        this.timer = this.time.addEvent({ delay: this.delay,
             callback: this.onTimerEvent, callbackScope: this, loop: true });

        this.joystick1= new VirtualJoystick({
            container	: document.getElementById('container'),
            mouseSupport	: true,
            strokeStyle	: 'cyan',
            limitStickTravel: true,
            stickRadius	: 25	
        });

        this.joystick1.addEventListener('touchStartValidation', function(event){
            var touch	= event.changedTouches[0];
            if( touch.pageX >= window.innerWidth/2 )	return false;
            return true
        });

        // one on the right of the screen
        this.joystick2	= new VirtualJoystick({
            container	: document.body,
            strokeStyle	: 'orange',
            limitStickTravel: true,
            stickRadius	: 0		
	    });
        this.joystick2.addEventListener('touchStartValidation', function(event){
            var touch	= event.changedTouches[0];
            if( touch.pageX < window.innerWidth/2 )	
            return false;
        });

        this.joystick2.addEventListener('touchStart', function(){
            this.onKeyup({keyCode : Phaser.Input.Keyboard.KeyCodes.A});
        }.bind(this))

        this.joystick2.addEventListener('touchStart', function(){
            // console.log('down')
        })
        this.joystick2.addEventListener('touchEnd', function(){
            // console.log('up')
        })
      
        this.input.keyboard.on('keyup', this.onKeyup, this);
        this.input.keyboard.on('keydown', this.onKeyup, this); 
    }

    onTimerEvent(){
        var joystick=this.joystick1;
        if(joystick.right())this.onKeyup({keyCode : Phaser.Input.Keyboard.KeyCodes.RIGHT});
        else if(joystick.left())this.onKeyup({keyCode : Phaser.Input.Keyboard.KeyCodes.LEFT});
        else if(joystick.up())this.onKeyup({keyCode : Phaser.Input.Keyboard.KeyCodes.UP});
        else if(joystick.down())this.onKeyup({keyCode : Phaser.Input.Keyboard.KeyCodes.DOWN});
    }

    onKeyup (event){
        let code = event.keyCode;
        if (code === Phaser.Input.Keyboard.KeyCodes.A){}
        eventsCenter.emit("keyup", event);
    }
}