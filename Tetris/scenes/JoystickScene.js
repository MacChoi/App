class JoystickScene extends Phaser.Scene{
    constructor(){
        super({
            key:'JoystickScene',
            active:true
        });
        
        this.virtualJoystick =0;
    }

    preload(){
        this.load.image('button', './lib/joystick/button.png');
    }
  
    create(){
        var button = this.add.image(1000, 1800, 'button').setScale(3);
        button.setInteractive();
        button.setTint(0x44ff44);
        button.on('pointerover', function () {
            button.setAlpha(0.5);
        });
    
        button.on('pointerout', function () {
            button.setAlpha(1);
        });

        this.joystick= new VirtualJoystick({
            container	: document.getElementById('container'),
            mouseSupport	: true,
            limitStickTravel: true,
            stickRadius	: 50
        });
     
        // scene.input.keyboard.on('keyup_LEFT', this.moveLeft, this);
        // scene.input.keyboard.on('keyup_RIGHT', this.moveRight, this);
        // scene.input.keyboard.on('keyup_UP', this.moveUp, this);
        // scene.input.keyboard.on('keyup_DOWN', this.moveDown, this);
        // scene.input.keyboard.on('keyup_ENTER', this.pressKey, this);
        // scene.input.keyboard.on('keyup_SPACE', this.pressKey, this);
        this.input.keyboard.on('keyup', this.onKeyup, this); 
    }

    update(){
        var joystick=this.joystick;
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
}