let img_backgroun = new File().loadImages("object/background/image",3)

class Background extends Frame {
    static NEW ={
        image :[0]
    }
    constructor(id,state,x,y){
        super(id,state,x,y,img_backgroun);
    }
    
}

class Wall extends Frame {
    static TOP ={
        image :[1]
    }

    static LEFT ={
        image :[2]
    }

    constructor(id,state,x,y){
        super(id,state,x,y,img_backgroun);
    }

    onCollision(e){
        
    }
}