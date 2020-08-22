var image_arrow = new File().loadImages("object/arrow/image",1);
class Arrow extends Frame {
    static NEW = {
        image : [0],
    }
    
    constructor(id,state,x,y){
        super(id,state,x,y,image_arrow);
        this.angle;
        this.time_finish;
        this.sound = new File().loadSounds("object/arrow/sound",1,1.0);
    }

    onDraw(){
        var now = (this.time_finish - new Date().getTime())/ 1000;
        for (let index = 0; index < now; index++) {
            minute[index].glow =2;
        }
        if(now<0){
            this.sound[0].play();
        }
    }

    onMouseDown(e) {
        var mouseFrame = new Frame();
        mouseFrame.x=e.offsetX / screen.scale;
        mouseFrame.y=e.offsetY / screen.scale;
        mouseFrame.centerX = mouseFrame.x;
        mouseFrame.centerY = mouseFrame.y;

        var a = new Angle();
        var b= 270-a.get(this,mouseFrame);
        b = b < 0 ? 270 + (90+b):b; 
        this.angle = Math.floor(360-b);
        this.state ={
            image : [0],
            rotate : [this.angle]
        };
        this.time_finish = new Date().getTime() + (this.angle * 1000);
        this.sound[0].pause();
    }
}