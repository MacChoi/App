class Ball extends Frame {
    static NEW ={
        image :[0]
    }

    constructor(id,state,x,y){
        super(id,state,x,y,
            new File().loadImages("object/ball/image",1));
        this.angle =270;
    }
    
    onDraw(){
        console.log(this.angle)
        this.state.x = [Math.cos(this.angle * Math.PI/180)*5];
        this.state.y = [Math.sin(this.angle * Math.PI/180)*5];
    }

    onCollision(e){
        var angle = new Angle().get(e.objB,e.objA,);
        this.angle = angle;    
    }
}