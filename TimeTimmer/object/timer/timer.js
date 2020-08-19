var image_timer = new File().loadImages("object/timer/image",3);
class Timer extends Frame {
    static BOARD = {
        image : [1],
        x : [0],
        y : [0],
    }
    constructor(id,state,x,y){
        super(id,state,x,y,image_timer);
    }
}