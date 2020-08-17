var image_clock = new File().loadImages("object/clock/image",4);
class Clock extends Frame {
    static BOARD = {
        image : [0],
        x : [0],
        y : [0],
    }
    static HOUR = {
        image : [1],
        x : [0],
        y : [0],  
    }
    static MINUTE = {
        image : [2],
        x : [0],
        y : [0],
    }
    static SECOND = {
        image : [3],
        x : [0],
        y : [0],
    }
    constructor(id,state,x,y){
        super(id,state,x,y,image_clock);
    }
}