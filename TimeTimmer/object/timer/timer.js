var image_timer = new File().loadImages("object/timer/image",2);
class Timer extends Frame {
    static BOARD = {
        image : [1],
    }
    static MINUTE = {
        image : [0],
    }
    constructor(id,state,x,y){
        super(id,state,x,y,image_timer);
    }
}