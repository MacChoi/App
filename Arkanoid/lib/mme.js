document.write(
'<!DOCTYPE html>'+
    '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'+
        '<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">'+
        '<link rel="icon" href="data:;base64,iVBORw0KGgo=">'+
    '</head>'+
    '<body onload="main();">'+
        '<script type="text/javascript" src="main.js"></script>'+
    '</body>'+
'</html>'
);

let SCREEN;
function update() {
	var start = new Date().getTime();
	SCREEN.draw();
    var delay = new Date().getTime() - start ; 
    setTimeout(update, Screen.updateDelay - delay);
}

class Screen {
    static updateDelay = 100;
    static container = new Array();
    constructor(ratio_h,ratio_v) {
        this.canvas = document.createElement( 'Canvas' );
        this.bufferCanvas = document.createElement( 'Canvas' );
        this.context= this.canvas.getContext('2d');
        this.bufferContext= this.bufferCanvas.getContext('2d');
        document.body.style.overflow = 'hidden';
        document.body.style.margin  = '0 auto';
        document.body.style.backgroundColor='black';
        document.body.appendChild(this.canvas);
        this.canvas.style.backgroundColor='white';
        this.canvas.style.margin  = '0 auto';
        this.ratio_h = ratio_h;
        this.ratio_v = ratio_v;
        this.scale_unit = 1 /1000;
        this.backgroundColor = "block";
        this.init();

        SCREEN = this;
        window.onresize = function(event) {
            SCREEN.init();
        }
        update();
    }

    setScale(scale){
        this.scale_unit = scale /1000;
    }

    setBackgroundColor(color){
        this.backgroundColor = color;
    }

    init() {
        this.width = 0;
        this.height = 0;
        while (this.width <= window.innerWidth && this.height <=window.innerHeight){
            this.width+=this.ratio_h;
            this.height+=this.ratio_v;
        }
        this.x = (window.innerWidth - this.width)/2;
        this.y = (window.innerHeight - this.height)/2;

        this.canvas.width=this.width;
        this.canvas.height=this.height;
        this.bufferCanvas.width=this.width;
        this.bufferCanvas.height=this.height;
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = this.x + 'px';
        this.canvas.style.top = this.y + 'px';

        this.scale = this.width * this.scale_unit;
        this.canvas.addEventListener("click", onMouseDown, false);
        this.canvas.addEventListener("mousemove", onMouseMove, false);
        this.canvas.addEventListener("mousedown", onMouseUp, false); 
        this.canvas.addEventListener("mouseup", onMouseUp, false); 
        this.canvas.addEventListener("touchmove", onTouchMove, false);
        this.canvas.addEventListener("touchstart", onTouchStart);
        this.canvas.addEventListener("touchend", onTouchEnd);
        window.addEventListener('keydown', onKeyDown);

        for (let index = 0; index < Screen.container.length; index++) {
            Screen.container[index].scale = this.scale;
            Screen.container[index].x = this.x;
            Screen.container[index].y = this.y;
        }
    }

    draw(){
        for (let index = 0; index < Screen.container.length; index++) {
            Screen.container[index].draw();
        }

        this.context.drawImage(this.bufferCanvas,0,0);
        this.bufferContext.fillStyle = this.backgroundColor;
        this.bufferContext.fillRect(0, 0, this.width, this.height);
    }

    addContainer(container){
        container.scale = this.scale;
        container.x = this.x;
        container.y = this.y;
        Screen.container.push(container);
    }
}

function onMouseMove(e) {
    for (let index = 0; index < Screen.container.length; index++) {
        e.mouseX=e.offsetX / Screen.container[index].scale;
        e.mouseY=e.offsetY / Screen.container[index].scale;
        Screen.container[index].onMouseMove(e);
    }
}

function onMouseDown(e) {
    for (let index = 0; index < Screen.container.length; index++) {
        e.mouseX=e.offsetX / Screen.container[index].scale;
        e.mouseY=e.offsetY / Screen.container[index].scale;
        Screen.container[index].onMouseDown(e);
    }
}

function onMouseUp(e) {
    for (let index = 0; index < Screen.container.length; index++) {
        e.mouseX=e.offsetX / Screen.container[index].scale;
        e.mouseY=e.offsetY / Screen.container[index].scale;
        Screen.container[index].onMouseUp(e);
    }
}

function onKeyDown(e) {
    for (let index = 0; index < Screen.container.length; index++) {
        Screen.container[index].onKeyDown(e);
    }
}

function onTouchMove(e){
    for (let index = 0; index < Screen.container.length; index++) {
        e.mouseX=(e.changedTouches[0].clientX / Screen.container[index].scale)-(Screen.container[index].x / Screen.container[index].scale);
        e.mouseY=(e.changedTouches[0].clientY / Screen.container[index].scale)-(Screen.container[index].y / Screen.container[index].scale);
        Screen.container[index].onMouseMove(e);
    }
}

function onTouchStart(e){
    for (let index = 0; index < Screen.container.length; index++) {
        e.mouseX=(e.changedTouches[0].clientX / Screen.container[index].scale)-(Screen.container[index].x / Screen.container[index].scale);
        e.mouseY=(e.changedTouches[0].clientY / Screen.container[index].scale)-(Screen.container[index].y / Screen.container[index].scale);
        Screen.container[index].onMouseDown(e);
    }
}

function onTouchEnd(e){
    for (let index = 0; index < Screen.container.length; index++) {
        e.mouseX=(e.changedTouches[0].clientX / Screen.container[index].scale)-(Screen.container[index].x / Screen.container[index].scale);
        e.mouseY=(e.changedTouches[0].clientY / Screen.container[index].scale)-(Screen.container[index].y / Screen.container[index].scale);
        Screen.container[index].onMouseUp(e);
    }
}

let ID = null;
class ObjectContainer{
    constructor(screen,names,fileCount) {
        this.offsetX = 0;
        this.offsetY = 0;
        this.OBJECT = new Array();
        this.screen = screen;
        this.context = screen.bufferContext;
    
        ID = new Enum(names);
        for(var i =0; i<ID.length; i++){
            new File().include("object/" + names[i] + "/" + names[i] + ".js");
        }

        File.appendLoading(fileCount);
    }

    add(frame){
        frame.screen = this.screen = screen;
        frame.OBJECT = this.OBJECT;
        frame.idx_obj = this.OBJECT.push(frame); 
    }

    delete(idx_frame){
        this.OBJECT.splice(idx_frame,1);
    }

    onMouseMove(e){
        for(var i =0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i].onMouseMove)this.OBJECT[i].onMouseMove(e);
        } 
    }
    onMouseDown(e){
        for(var i =0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i].onMouseDown)this.OBJECT[i].onMouseDown(e);
        } 
    }
    onMouseUp(e){
        for(var i =0; i<this.OBJECT.length; i++){
            if(this.OBJECT[i].onMouseUp)this.OBJECT[i].onMouseUp(e);
        } 
    }

    onKeyDown(e) {
        for(var i =0; i<this.OBJECT.length; i++){
            e.id = this.OBJECT[i].id;
            e.state = this.OBJECT[i].state;
            if(this.OBJECT[i].onKeyDown)this.OBJECT[i].onKeyDown(e);
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
        this.context.translate(this.offsetX,this.offsetY);
        this.context.scale(this.screen.scale,this.screen.scale);
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
        this.offsetX=0;
        this.offsetY=0;
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
                    isCollision=true;
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
                if(objA.onCollision)objA.onCollision({objA:objA,objB:objB});
                isCollision=true;
            }
        }
        return isCollision;
    }

    draw(context){
        this.image = this.images[Math.abs(this.idx_img)];
        this.width = this.image.width;
        this.height = this.image.height;
        this.centerX = this.x + this.width/2;
        this.centerY = this.y + this.height/2;
        //onOutOfScreen
        var frm_Screen = new Frame();
        frm_Screen.x= -this.offsetX/ this.screen.scale;
        frm_Screen.y= -this.offsetY/ this.screen.scale;
        frm_Screen.width = this.screen.width / this.screen.scale;
        frm_Screen.height = this.screen.height/ this.screen.scale;
        context.strokeRect(frm_Screen.x,frm_Screen.y,frm_Screen.width,frm_Screen.height);
        if(!this.collision.isCheckRect(this,frm_Screen)){    
            if(this.onOutOfScreen)this.onOutOfScreen(this);
            return; 
        }
    
        this.context =context;
        if(this.state.image.length-1 < this.idx_frame)this.idx_frame = 0;
        this.idx_img = this.state.image[this.idx_frame] * this.reversal;
        this.px = this.x;
        this.py = this.y;
        if(this.state.x)this.x += this.state.x[this.idx_frame] * this.reversal;
        if(this.checkCollision(this))this.x = this.px;
        if(this.state.x)this.y += this.state.y[this.idx_frame];
        if(this.checkCollision(this))this.y = this.py;
       
        if(this.state.rotate)this.rotate = this.state.rotate[this.idx_frame] * this.reversal;
        else this.rotate = 0;

        if(this.state.weight){
            this.y += this.state.weight[this.idx_frame];
            if(this.checkCollision(this))this.y = this.py;
        }
        
        context.save();
        //Alpha
        if(this.state.alpha)context.globalAlpha = this.state.alpha[this.idx_frame];
        //Rotate
        context.translate(this.centerX,this.centerY);
        context.rotate(this.radToDag(this.rotate));
        context.translate(-this.centerX,-this.centerY);
        //Glow up
        if(this.glow > 0){
            if((this.glow % 2)==0){
                context.filter = 'hue-rotate(120deg) grayscale(10%) brightness(150%)';
            }
            this.glow-=1;
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

    setState(state,x,y,reversal){
        //if(this.state == state)return;
        this.state = state;
        this.reversal = reversal;
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
            rect1Right = Frame1.x + Frame1.width;
            rect1Bottom = Frame1.y + Frame1.height;
            rect2Right = Frame2.x + Frame2.width;
            rect2Bottom = Frame2.y + Frame2.height;
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
            rect2CenterX = Frame2.x + Frame2.width/2;
            rect2CenterY = Frame2.y + Frame2.height/2;
            rect1CenterX = Frame1.x + Frame1.width/2;
            rect1CenterY = Frame1.y + Frame1.height/2;
        } catch (error) {
            return false;
        }
        if((Math.abs(rect2CenterX - rect1CenterX) < Frame1.width / 2 + Frame2.width / 2) &&
            Math.abs(rect2CenterY - rect1CenterY) < Frame1.height / 2 + Frame2.height / 2) {
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
                Frame1.collisionX = (checkRect.left + width) ;
                Frame1.collisionY = (checkRect.top + height);
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
    static fileCountMax = 0;
    static img_loading = null;
    static onLoading = null;
    static appendLoading(fileCountMax){
        if(File.fileCountMax != 0){
            File.fileCountMax+=fileCountMax;
            return;
        }
        File.fileCountMax = fileCountMax;
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
        console.log("loadImage: " + imagePath +" " + 1);
        return image;
    }

    loadImages(imagePath,imageCount){
        var count = 0;
        var IMAGES = new Array(imageCount);
        for(var i = 0; i<imageCount; i++){
            count++;
            IMAGES[i] = new Image();
            IMAGES[i].src =  imagePath + "/" + i + ".png";
            if(File.onLoading)IMAGES[i].onload = File.onLoading(++File.fileCount);
            //console.log("IMAGES[" + i + "].src: " + IMAGES[i].src);
        }
        console.log("loadImages: " + imagePath +" " + count);
        return IMAGES;
    }

    loadSounds(soundPath,soundCount,volume){
        var count = 0;
        var SOUNDS = new Array(soundCount);
        for(var i = 0; i<soundCount; i++){
            count++;
            SOUNDS[i] = new Audio(soundPath + "/" + i + ".mp3");
            SOUNDS[i].volume = volume ;
            if(File.onLoading)File.onLoading(++File.fileCount);

            //console.log("SOUND[" + i + "].src: " + soundPath + "/" + (i) + ".mp3");
        }
        console.log("loadSounds: " + soundPath +" "+ count);
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

File.onLoading = function (count){
	if(count==File.fileCountMax)File.removeLoading();
	//console.log("onLoading :" +count ,File.fileCountMax);
};

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
    get(frame1,frame2) {
        var dy = frame2.centerY - frame1.centerY;
        var dx = frame2.centerX - frame1.centerX;
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