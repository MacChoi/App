var image_arrow = new File().loadImages("object/arrow/image",1);
class Arrow extends Frame {
    static angle;
    static time_finish;
    static sound = new File().loadSounds("object/arrow/sound",1,1.0);
    static NEW = {
        image : [0],
    }
    constructor(id,state,x,y){
        super(id,state,x,y,image_arrow);
    }
    onMousedown(e) {Arrow.sound[0].pause();
        var mouseFrame = new Frame();
        mouseFrame.x=e.offsetX / screen.scale;
        mouseFrame.y=e.offsetY / screen.scale;
        mouseFrame.centerX = mouseFrame.x;
        mouseFrame.centerY = mouseFrame.y;

        var a = new Angle();
        var b= 270-a.get(this,mouseFrame);
        b = b < 0 ? 270 + (90+b):b; 
        Arrow.angle = Math.floor(360-b);
        this.state ={
            image : [0],
            rotate : [Arrow.angle]
        };
        Arrow.time_finish = new Date().getTime() + (Arrow.angle * 1000);
   
        Arrow.sound[0].pause();
    }
}