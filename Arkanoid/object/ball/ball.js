class Ball extends Frame {
    static NEW ={
        image :[0]
    }

    constructor(id,state,x,y){
        super(id,state,x,y,
            new File().loadImages("object/ball/image",1));
    }
}