class Player extends Frame {
    static NEW ={
        image :[0]
    }

    static LEFT = {
        image : [0],
        x : [-5],
        y : [0]
    }

    static RIGHT = {
        image : [0],
        x : [5],
        y : [0]
    }

    constructor(id,state,x,y){
        super(id,state,x,y,
            new File().loadImages("object/player/image",1));
    }

    onKeyDown(e){
        switch (e.keyCode){
            case KEY.LEFT:
                this.setState(Player.LEFT,this.x,this.y,1);
                break;
            case KEY.RIGHT:
                this.setState(Player.RIGHT,this.x,this.y,1);
                break;
        }
    }

    onCollision(e){
        
    }
}