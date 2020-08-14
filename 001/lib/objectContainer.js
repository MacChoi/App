let ID = null;
class ObjectContainer{
    constructor(screen,names) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.OBJECT = new Array();
        this.screen = screen;
        this.context = screen.bufferContext;
    
        ID = new Enum(names);
        for(var i =0; i<ID.length; i++){
            new File().include("object/" + names[i] + "/" + names[i] + ".js");
        }
    }

    add(frame){
        frame.OBJECT = this.OBJECT;
        frame.idx_obj = this.OBJECT.push(frame); 
    }

    delete(idx_frame){
        this.OBJECT.splice(idx_frame,1);
    }

    onMousemove(e){
        for(var i =0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i].onMousemove)this.OBJECT[i].onMousemove(e);
        } 
    }
    onMousedown(e){
        for(var i =0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i].onMousedown)this.OBJECT[i].onMousedown(e);
        } 
    }
    onMouseup(e){
        for(var i =0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i].onMouseup)this.OBJECT[i].onMouseup(e);
        } 
    }

    onKeydown(e) {
        for(var i =0; i<this.OBJECT.length; i++){
            e.id = this.OBJECT[i].id;
            e.state = this.OBJECT[i].state;
            if(this.OBJECT[i].onKeydown)this.OBJECT[i].onKeydown(e);
        } 
        e.preventDefault();
    }
  
    setpixelated(context){
        context['imageSmoothingEnabled'] = false;       /* standard */
        context['mozImageSmoothingEnabled'] = false;    /* Firefox */
        context['oImageSmoothingEnabled'] = false;      /* Opera */
        context['webkitImageSmoothingEnabled'] = false; /* Safari */
        context['msImageSmoothingEnabled'] = false;     /* IE */
    }

    draw(){
        this.setpixelated(this.context);
        this.context.save();
        this.context.scale(this.screen.scale,this.screen.scale);
        this.context.translate(this.offsetX,this.offsetY);
        for(var i=0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i] == null)continue;
            this.OBJECT[i].idx = i;
            this.OBJECT[i].offsetX = this.offsetX;
            this.OBJECT[i].offsetY = this.offsetY;
            this.OBJECT[i].draw(this.context);
            if(this.OBJECT[i].onDraw)this.OBJECT[i].onDraw(this.OBJECT[i]);
            if(this.OBJECT[i].state.image.length-1 == this.OBJECT[i].idx_frame)
                if(this.OBJECT[i].endFrame)this.OBJECT[i].endFrame(this.OBJECT[i]);
            else if(this.OBJECT[i].nextFrame)this.OBJECT[i].nextFrame(this.OBJECT[i]);
        } 
        this.context.restore();
    }
}

class Frame{
    constructor(id,state,x,y,images) {
        this.id = id;
        this.images = images;
        this.setState(state,x,y,1);
        this.collision = new Collision();
    }

    checkCollision(object){
        var objA = object;
        if(!object.onCollision)return false;
        var isCollision = false;
        for(var i=0; i<this.OBJECT.length; i++){
            var objB = this.OBJECT[i];
            if(objB == null)continue;
            if(objA.id == objB.id)continue;
            if(!objB.onCollision)continue;
            
            if(this.collision.isCheckRect(objA, objB)) {
                var rect = this.collision.getCheckRect(objA,objB);
                if(this.collision.isCheckPixel(objA,objB,rect)){
                    if(objA.onCollision)objA.onCollision({objA:objA,objB:objB});
                    //isCollision=true;
                    return true;
                }
            }
        }
        return isCollision;
    }

    checkCollisionRect(object){
        var objA = object;
        if(!object.onCollision)return false;
        var isCollision = false;
        for(var i=0; i<this.OBJECT.length; i++){
            var objB = this.OBJECT[i];
            if(objB == null)continue;
            if(objA.id == objB.id)continue;
            if(!objB.onCollision)continue;
            if(this.collision.isCheckRect(objA, objB)) {
                //isCollision=true;
                return true;
            }
        }
        return isCollision;
    }

    draw(context){
        this.context =context;
        if(this.state.image.length-1 < this.idx_frame)this.idx_frame = 0;
        this.idx_img = this.state.image[this.idx_frame] * this.flip;
        this.px = this.x;
        this.py = this.y;
        this.x += this.state.x[this.idx_frame] * this.flip;
        if(this.checkCollisionRect(this))this.x = this.px;
        this.y += this.state.y[this.idx_frame];
        if(this.checkCollisionRect(this))this.y = this.py;
       
        if(this.state.rotate)this.rotate = this.state.rotate[this.idx_frame] * this.flip;
        else this.rotate = 0;

        if(this.state.weight){
            this.y += this.state.weight[this.idx_frame];
            if(this.checkCollisionRect(this))this.y = this.py;
        }
        
        this.image = this.images[Math.abs(this.idx_img)];
        this.w = this.image.width;
        this.h = this.image.height;
        this.centerX = this.x + this.w/2;
        this.centerY = this.y + this.h/2;

        context.save();
        //scale
        context.scale(this.scale,this.scale);
        //Alpha
        if(this.state.alpha)context.globalAlpha = this.state.alpha[this.idx_frame];
        //rotate
        context.translate(this.centerX,this.centerY);
        context.rotate(this.radToDag(this.rotate));
        context.translate(-this.centerX,-this.centerY);
        //lightup
        if(this.lightup > 0){
            if((this.lightup % 2)==0){
                context.filter = 'hue-rotate(120deg) grayscale(10%) brightness(150%)';
            }
            this.lightup-=1;
        }

        if(this.isDrawCollision == true)
        context.strokeRect(this.collisionX,this.collisionY,5,5);

        if(this.idx_img < 0)
            this.flipHorizontally(context,this.image,this.x,this.y); 
        else
            context.drawImage(this.image,this.x,this.y);
        context.restore();

        context.globalAlpha = 1.0;
        this.idx_frame ++;
    }

    flipHorizontally(context,img,x,y){
        context.translate(x+img.width,y);
        context.scale(-1,1);
        context.drawImage(img,0,0);
        context.setTransform(1,0,0,1,0,0);
    }

    setState(state,x,y,flip){
        //if(this.state == state)return;
        this.state = state;
        this.flip = flip;
        this.x = x;
        this.y = y
        this.idx_frame = 0;
        this.idx_img = 0;
    }

    delete(idx_frame){
        this.OBJECT.splice(idx_frame,1);
    }

    radToDag(angle){
        return angle * Math.PI/180;
    }

    // onMouse(e){}
    // onKey(e){}
    // onDraw(e){}
    // nextFrame(e){}
    // endFrame(e){}
    // onCollision(e){}
}

class Collision{
    constructor() {
        this.canvasA = document.createElement('Canvas');
        this.canvasA.width = screen.canvas.width;
        this.canvasA.height = screen.canvas.height;
        this.contextA= this.canvasA.getContext('2d');
        this.canvasB = document.createElement('Canvas');
        this.canvasB.width = screen.canvas.width;
        this.canvasB.height = screen.canvas.height;
        this.contextB= this.canvasB.getContext('2d');
    }
    
    getCheckRect(Frame1, Frame2) {
        var rect1Right,rect1Bottom,rect2Right,rect2Bottom;
        var rect3Left,rect3Top,rect3Right,rect3Bottom;
        try {
            rect1Right = Frame1.x + Frame1.w;
            rect1Bottom = Frame1.y + Frame1.h;
            rect2Right = Frame2.x + Frame2.w;
            rect2Bottom = Frame2.y + Frame2.h;
            rect3Left = Math.max(Frame1.x, Frame2.x);
            rect3Top = Math.max(Frame1.y, Frame2.y);
            rect3Right = Math.min(rect1Right, rect2Right);
            rect3Bottom = Math.min(rect1Bottom, rect2Bottom);
        } catch (error) {
            return {left: 0,top: 0,width: 0,height: 0}
        }
        return {
          left: rect3Left,
          top: rect3Top,
          width: rect3Right - rect3Left,
          height: rect3Bottom - rect3Top
        }
    }

    isCheckRect(Frame1, Frame2) {
        var rect2CenterX,rect2CenterY,rect1CenterX,rect1CenterY;
        try {
            rect2CenterX = Frame2.x + Frame2.w/2;
            rect2CenterY = Frame2.y + Frame2.h/2;
            rect1CenterX = Frame1.x + Frame1.w/2;
            rect1CenterY = Frame1.y + Frame1.h/2;
        } catch (error) {
            return false;
        }
        if((Math.abs(rect2CenterX - rect1CenterX) < Frame1.w / 2 + Frame2.w / 2) &&
            Math.abs(rect2CenterY - rect1CenterY) < Frame1.h / 2 + Frame2.h / 2) {
            return true
        } else {
            return false
        }
    }

    isCheckPixel(Frame1,Frame2,checkRect) {
        var imgData1Data,imgData2Data;
        try {
            this.contextA.clearRect(0, 0, this.contextA.width, this.contextA.height);
            this.contextB.clearRect(0, 0, this.contextB.width, this.contextB.height);
            
            this.contextA.drawImage(Frame1.image, Frame1.x, Frame1.y);
            this.contextB.drawImage(Frame2.image, Frame2.x, Frame2.y);

            var imgData1 = this.contextA.getImageData(checkRect.left, checkRect.top, checkRect.width, checkRect.height);
            var imgData2 = this.contextB.getImageData(checkRect.left, checkRect.top, checkRect.width, checkRect.height);
            imgData1Data = imgData1.data;
            imgData2Data = imgData2.data;
        } catch (error) {
            return false;
        }

        var isCheck =false;
        var width = 0;
        var height = 0;
        for(var i = 3, len = imgData1Data.length; i < len; i += 4) {
            if(imgData1Data[i] > 0 && imgData2Data[i] > 0) {
                Frame1.collisionX = (checkRect.left + width) * Frame1.scale;
                Frame1.collisionY = (checkRect.top + height) * Frame1.scale;
                //isCheck = true;
                return true;
            }
          
            if(width == checkRect.width){
                width = 0;
                height++;
            }
            width += 1;
        }
        return isCheck
    }
}

class File{
    static fileCount = 0;
    static img_loading = null;
    static onLoading =null;
    static appendLoading(){
        File.img_loading = document.createElement('img'); 
        File.img_loading.src = 'lib/Spinner.gif';
        File.img_loading.style = 'position:absolute;max-width:100%; max-height:100%;width:auto;height:auto;margin:auto;top:0; bottom:0; left:0; right:0;';
        document.body.appendChild(File.img_loading);
    }

    static removeLoading(){
        File.img_loading.remove();
    }
    
    include(filename) { 
        var jscript = document.createElement('script');
        jscript.type = 'text/javascript';
        jscript.src = filename;
        document.head.appendChild( jscript );
    }

    loadImage(imagePath){
        var image = new Image();
        image.src = imagePath;
        if(File.onLoading)image.onload = File.onLoading(++File.fileCount);
        return image;
    }

    loadImages(imagePath,imageCount){
        var count = 0;
        var IMAGES = new Array(imageCount+1);
        IMAGES[0] = new Image();
        for(var i = 1; i<imageCount+1; i++){
            count++;
            IMAGES[i] = new Image();
            IMAGES[i].src =  imagePath + "/" + i + ".png";
            if(File.onLoading)IMAGES[i].onload = File.onLoading(++File.fileCount);
            //console.log("IMAGES[" + i + "].src: " + IMAGES[i].src);
        }
        console.log("loadImages: " + imagePath +" " + count);
        return IMAGES;
    }

    loadSounds(soundPath,soundCount,volume ){
        var count = 0;
        var SOUNDS = new Array(soundCount+1);
        for(var i = 1; i<soundCount+1; i++){
            count++;
            SOUNDS[i] = new Audio(soundPath + "/" + i + ".mp3");
            SOUNDS[i].volume = volume ;
            //console.log("SOUND[" + i + "].src: " + soundPath + "/" + (i) + ".mp3");
        }
        //console.log("loadSounds: " + soundPath +" "+ count);
        return SOUNDS;
    }

    cutImageUp(image,numColsToCut,numRowsToCut) {
        var widthOfOnePiece = image.width / numColsToCut;
        var heightOfOnePiece = image.height / numRowsToCut;
        var imagePieces = new Array();
        imagePieces.push(new Image());
        for(var x = 0; x < numColsToCut; ++x) {
            for(var y = 0; y < numRowsToCut; ++y) {
                var canvas = document.createElement('canvas');
                canvas.width = widthOfOnePiece;
                canvas.height = heightOfOnePiece;
                var context = canvas.getContext('2d');
                context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
                var img = new Image();
                img.src = canvas.toDataURL("image/png");
                imagePieces.push(this); 
            }
        }
        return imagePieces;
    }
}

class Enum{
    constructor(constantsList){
        for (let idx_frame = 0; idx_frame < constantsList.length; idx_frame++) {
            this[constantsList[idx_frame]] = idx_frame;   
            this.length = idx_frame + 1;
        }
    }
}

Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

class KEY{
    static get LEFT(){return 37;};
    static get UP(){return 38;};
    static get RIGHT(){return 39;};
    static get DOWN(){return 40;};
    static get A(){return 65;};
    static get B(){return 66;};
    static get X(){return 88;};
    static get Y(){return 89;};
}

class MOUSE{
    static get MOUSEMOVE(){return 37;};
    static get MOUSEDOWN(){return 38;};
    static get MOUSEUP(){return 39;};
}

class Random{
    constructor(start,end){
        this.start = start;
        this.end = end;
        this.init(start,end);
    }
    
    init(start,end){
        this.random_table = new Array();
        for(var i=start; i<end+1; i++){
            this.random_table.push(i);
        }
        for(var i=0; i<100; i++){
            this.random_table.swap(this.range(0,end-start),this.range(0,end-start));
        }
    }

    get(){
        if(this.random_table.length == 0)this.init(this.start,this.end);
        var random = this.random_table[0];
        this.random_table.splice(0,1);
        return random;
    }

    range(start, end){
        return Math.floor((Math.random() * (end-start+1)) + start);
    }
}

class Angle{
    //angle
    get(cx, cy, cx2, cy2) {
        var dy = cy2 - cy;
        var dx = cx2 - cx;
        var theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI; 
        //return theta;

        return theta >= 360 ? theta - 360 : theta < 0 ? theta + 360 : theta;
    }
    
    getCircleXY(radius,angle,angleGap){
        var arrayPosX = new Array(0);
        var arrayPosY = new Array(0);
        for (let index = angle; index >= 0; index-=angleGap) {
            var posX = radius * Math.sin(index * Math.PI/180);
            var posY = radius * Math.cos(index * Math.PI/180);
            
            arrayPosX.push(parseInt(posX));
            arrayPosY.push(parseInt(posY));
        }
        console.log("angle getCircleX [" + arrayPosX.length +"] :" +  arrayPosX);
        console.log("angle getCircleY [" + arrayPosY.length +"] :" +  arrayPosY);
    }
    //new Angle().getCircleXY(100,360,10);
}