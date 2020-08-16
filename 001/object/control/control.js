class ControlPad{
    constructor(objectContainer){
        var images = new File().loadImages("object/control/image",5);
        var imgW = 47;
        var imgH = 48;
        var sX = imgW*1.5;
        var sY = imgH*9;
   
        objectContainer.add(new CONTROL(KEY.UP,CONTROL.UP,sX,sY,images));
        objectContainer.add(new CONTROL(KEY.LEFT,CONTROL.LEFT,sX-imgW,sY+imgH,images));
        objectContainer.add(new CONTROL(KEY.RIGHT,CONTROL.RIGHT,sX +imgW,sY+imgH,images));
        objectContainer.add(new CONTROL(KEY.DOWN,CONTROL.DOWN,sX,sY+imgH*2,images));

        var keyImgW = 55;
        var keyImgH = 55;
        var keyX = keyImgW*3.2;
        var keyY = keyImgH*7.9;

        objectContainer.add(new CONTROL(KEY.X,CONTROL.X,keyX,keyY,images));
        objectContainer.add(new CONTROL(KEY.Y,CONTROL.Y,keyX,keyY+keyImgH+imgW/2,images));
        objectContainer.add(new CONTROL(KEY.A,CONTROL.A,keyX+keyImgW+imgW/2,keyY,images));
        objectContainer.add(new CONTROL(KEY.B,CONTROL.B,keyX+keyImgW+imgW/2,keyY+keyImgH+imgW/2,images));
    }
}
class CONTROL extends Frame {
    static UP = {
        image : [1],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static LEFT = {
        image : [1],
        x : [0],
        y : [0],
        rotate :[270],
        alpha : [0.5],
    }
    static RIGHT = {
        image : [1],
        x : [0],
        y : [0],
        rotate :[90],
        alpha : [0.5],
    }
    static DOWN = {
        image : [1],
        x : [0],
        y : [0],
        rotate :[180],
        alpha : [0.5],
    }
    static X = {
        image : [2],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static Y = {
        image : [3],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static A = {
        image : [4],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static B = {
        image : [5],
        x : [0],
        y : [0],
        alpha : [0.5],
    } 
    constructor(id,state,x,y,images){
        super(id,state,x,y,images);
        this.isOffset = false;
        this.isClick = null;
    }
    onKeydown(e) { 
        //console.log("e.onKey: ID.CONTROL " + e.keyCode);
        switch (e.keyCode){
            case KEY.LEFT:
                if(e.state == CONTROL.LEFT)this.glow = 2;
                break;
            case KEY.RIGHT:
                if(e.state == CONTROL.RIGHT)this.glow = 2;
                break;
            case KEY.UP:
                if(e.state == CONTROL.UP)this.glow = 2;
            break;    
            case KEY.DOWN:
                if(e.state == CONTROL.DOWN)this.glow = 2;
            break;
            case KEY.X:
                if(e.state == CONTROL.X)this.glow = 2;
            break; 
            case KEY.Y:
                if(e.state == CONTROL.Y)this.glow = 2;
            break; 
            case KEY.A:
                if(e.state == CONTROL.A)this.glow = 2;
            break;
            case KEY.B:
                if(e.state == CONTROL.B)this.glow = 2; 
            break;          
        }
    }
    onMousedown(e) {
        var mouseFrame = new Frame();
        mouseFrame.x=e.offsetX / screen.scale;
        mouseFrame.y=e.offsetY / screen.scale;
        mouseFrame.width = 10;
        mouseFrame.height = 10;

        //console.log(this.id , this.x ,this.y , this.image.width , this.image.height);
        //console.log(mouseFrame.x,mouseFrame.y , mouseFrame.width , mouseFrame.height);
        
        if(this.collision.isCheckRect(this,mouseFrame)){
            this.isClick = this.getKeyboardEvent(this.id);
            objects.onKeydown(this.isClick);
        }
    }

    onMouseup(e) {
        this.isClick = null;
    }

    onDraw() {
        if(this.isClick){
            objects.onKeydown(this.isClick);
            //this.isClick = null;
            this.glow = 2; 
        }
    }

    onMousemove(e) {
        var mouseFrame = new Frame();
        mouseFrame.x=e.offsetX / screen.scale;
        mouseFrame.y=e.offsetY / screen.scale;
        mouseFrame.width = 10;
        mouseFrame.height = 10;

        //console.log(this.id , this.x ,this.y , this.image.width , this.image.height);
        //console.log(mouseFrame.x,mouseFrame.y , mouseFrame.width , mouseFrame.height);
        
        if(this.collision.isCheckRect(this,mouseFrame)){
            this.isClick = this.getKeyboardEvent(this.id);
            objects.onKeydown(this.isClick);
        }else{
            this.isClick = null;
        }
    }

    onTouchmove(e) {
        var touches = e.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var mouseFrame = new Frame();
            mouseFrame.x=(touches[i].clientX-25) / screen.scale;
            mouseFrame.y=(touches[i].clientY-20) / screen.scale;
            mouseFrame.width = 25;
            mouseFrame.height = 20;
            //console.log(e);
            //console.log(this.id , this.x ,this.y , this.image.width , this.image.height);
            //console.log(mouseFrame.x,mouseFrame.y , mouseFrame.width , mouseFrame.height);
            
            if(this.collision.isCheckRect(this,mouseFrame)){console.log()
                this.isClick = this.getKeyboardEvent(this.id);
               // objects.onKeydown(this.isClick);
            }else{
                this.isClick = null;
            }
        }
    }
    

    getKeyboardEvent(keycode){
        return new KeyboardEvent("keydown", {
            key: "e",
            keyCode: keycode,
            code: "KeyE",
            which: keycode,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,  
        }) 
    }
}