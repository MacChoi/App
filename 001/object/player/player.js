var image_player = new File().loadImages("object/player/image",4);
var sound_player = new File().loadSounds("object/player/sound",1,0.2);
class PLAYER extends Frame {
    static NEW = {
        image : [1,1,4,4,1,1,4,4],
        x : [0,0,0,0,0,0,0,0],
        y : [0,0,0,0,0,0,0,0],
        //weight : [5,5,5,5,5,5,5,5],
        //rotate : [30,60,90,180,210,240,270,360],
    }
    static NEW2 = {
        image : [1,1,4,4,1,1,4,4],
        x : [0,0,0,0,0,0,0,0],
        y : [0,0,0,0,0,0,0,0],
        //weight : [5,5,5,5,5,5,5,5],
        //rotate : [30,60,90,180,210,240,270,360],
    }
    static RIGHT = {
        image : [1,1,4,4,1,1,4,4],
        x : [5,5,5,5,5,5,5,5],
        y : [0,0,0,0,0,0,0,0],
       // weight : [5,5,5,5,5,5,5,5],
    }
    static UP = {
        image : [1,1,2,2,1,1,2,2],
        x : [0,0,0,0,0,0,0,0],
        y : [-5,-5,-5,-5,0,0,0,0],
       // weight : [5,5,5,5,5,5,5,5],
    }
    static DOWN = {
        image : [1,1,2,2,1,1,2,2],
        x : [0,0,0,0,0,0,0,0],
        y : [5,5,5,5,0,0,0,0],
       // weight : [5,5,5,5,5,5,5,5],
    }
    
    constructor(id,state,x,y,flip){
        super(id,state,x,y,image_player);
        this.scale = 2;
        this.flip = flip;
        //this.lightup = 100;

        this.isDrawCollision =true;
    }
    onKeydown(e) {  
        //console.log("e.keyCode: ID.PLAYER " + e.keyCode);
       // if(this.id != ID.player)return;
        switch (e.keyCode){
            case KEY.LEFT:
                this.setState(PLAYER.RIGHT,this.x,this.y,-1);
                break;
            case KEY.RIGHT:
                this.setState(PLAYER.RIGHT,this.x,this.y,1);
                break;
            case KEY.UP:
                this.setState(PLAYER.UP,this.x,this.y,this.flip);
            break;    
            case KEY.DOWN:
                this.setState(PLAYER.DOWN,this.x,this.y,this.flip);
            break;          
        }
        //console.log("collision >>" + collision.isCheckRect(OBJECT[0],OBJECT[1])); 
    }
    endFrame  = function(e) {
        switch(e.state){
            case this.NEW:
            break;
            case this.UP:
            case this.DOWN:
            case this.LEFT:
             //   this.setState(PLAYER.NEW,this.x,this.y,this.flip);
            break;
            case this.RIGHT:
            //    this.setState(PLAYER.NEW,this.x,this.y,this.flip);
            break;
        }
        //console.log("e.endFrame: ID.PLAYER " + e);
    }
    onDraw(e) {
        //console.log("camera : " + this.x ,this.y);
        objects.offsetX -= (this.x -this.px);
        objects.offsetY -= (this.y -this.py);
    //console.log("e.onDraw: ID.PLAYER " + e);
    }
    nextFrame(e) {
        //console.log("e.nextFrame: ID.PLAYER " + e);
    }
    onCollision(e) {
        //console.log("e.onCollision: ID.PLAYER " +e.objA.id +" " + e.objB.idx);
    }
}