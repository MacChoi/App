var image_clock = new File().loadImages("object/clock/image",10);
class Clock extends Frame {
    static NEW = {
        image : [0],
        x : [0],
        y : [0],
    }
    constructor(id,state,x,y){
        super(id,state,x,y,image_clock);
    }
}