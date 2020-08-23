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
        image : [0],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static LEFT = {
        image : [0],
        x : [0],
        y : [0],
        rotate :[270],
        alpha : [0.5],
    }
    static RIGHT = {
        image : [0],
        x : [0],
        y : [0],
        rotate :[90],
        alpha : [0.5],
    }
    static DOWN = {
        image : [0],
        x : [0],
        y : [0],
        rotate :[180],
        alpha : [0.5],
    }
    static X = {
        image : [1],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static Y = {
        image : [2],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static A = {
        image : [3],
        x : [0],
        y : [0],
        alpha : [0.5],
    }
    static B = {
        image : [4],
        x : [0],
        y : [0],
        alpha : [0.5],
    } 
    constructor(id,state,x,y,images){
        super(id,state,x,y,images);
        this.isOffset = false;
        this.isClick = null;
    }
    onKeyDown(e) { 
        console.log("e.onKey: ID.CONTROL " + e.keyCode);
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

    onMouseDown(e) {
        var mouseFrame = new Frame();
        mouseFrame.x=e.mouseX;
        mouseFrame.y=e.mouseY;
        mouseFrame.width = 10;
        mouseFrame.height = 10;
        //console.log(mouseFrame.x,mouseFrame.y , mouseFrame.width , mouseFrame.height);
        if(this.collision.isCheckRect(this,mouseFrame)){
            this.isClick = this.getKeyboardEvent(this.id);
            objects.onKeyDown(this.isClick);
        }
    }

    onMouseUp(e) {
        this.isClick = null;
    }

    onMouseMove(e) {
        var mouseFrame = new Frame();
        mouseFrame.x=e.mouseX;
        mouseFrame.y=e.mouseY;
        mouseFrame.width = 10;
        mouseFrame.height = 10;
        //console.log(mouseFrame.x,mouseFrame.y , mouseFrame.width , mouseFrame.height);
        if(this.collision.isCheckRect(this,mouseFrame)){
            this.isClick = this.getKeyboardEvent(this.id);
            objects.onKeyDown(this.isClick);
        }else{
            this.isClick = false;
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

    onDraw() {
        if(this.isClick){
            objects.onKeyDown(this.isClick);
            //this.isClick = null;
            this.glow = 2; 
        }
    }
}