class JoystickScene extends Phaser.Scene{
    constructor(){
        super({
            key:'JoystickScene',
            active:true
        });
 
        this.delay = 250;
    }

    preload(){}
  
    create(){
        this.timer = this.time.addEvent({ delay: this.delay,
             callback: this.onTimerEvent, callbackScope: this, loop: true });

        this.joystick1= new VirtualJoystick({
            container	: document.getElementById('container'),
            mouseSupport	: true,
            strokeStyle	: 'cyan',
            limitStickTravel: true,
            stickRadius	: 40	
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
      
        // scene.input.keyboard.on('keyup_LEFT', this.moveLeft, this);
        // scene.input.keyboard.on('keyup_RIGHT', this.moveRight, this);
        // scene.input.keyboard.on('keyup_UP', this.moveUp, this);
        // scene.input.keyboard.on('keyup_DOWN', this.moveDown, this);
        // scene.input.keyboard.on('keyup_ENTER', this.pressKey, this);
        // scene.input.keyboard.on('keyup_SPACE', this.pressKey, this);
        this.input.keyboard.on('keyup', this.onKeyup, this); 
    }

    onTimerEvent(){
        var joystick=this.joystick1;
        // console.log(
        // ' dx:'+joystick.deltaX()
        // + ' dy:'+joystick.deltaY()
        // + (joystick.right()	? 'right'	: '')
        // + (joystick.up()	? ' up'		: '')
        // + (joystick.left()	? ' left'	: '')
        // + (joystick.down()	? ' down' 	: '')	
        // );
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

    // update (){
    //     console.log('Event.progress: ' + this.timer.getProgress().toString().substr(0, 4));
    // }
}