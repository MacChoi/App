var image_timer = new File().loadImages("object/timer/image",3);
class Timer extends Frame {
    static BOARD = {
        image : [1],
    }
    static MINUTE = {
        image : [0],
    }
    static ARROW = {
        image : [2],
    }
    constructor(id,state,x,y){
        super(id,state,x,y,image_timer);
    }
    onMousedown(e) {
        var mouseFrame = new Frame();
        mouseFrame.x=e.offsetX / screen.scale;
        mouseFrame.y=e.offsetY / screen.scale;
        mouseFrame.centerX = mouseFrame.x+10/2;
        mouseFrame.centerY = mouseFrame.y+10/2;

        var a = new Angle();
        var b= 270-a.get(this,mouseFrame);
        b = b < 0 ? 270 + (90+b):b; 
        console.log(">>>>>>  "+ b);
        
        this.glow =10;
    }
}