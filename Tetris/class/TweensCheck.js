class TweensCheck{
    constructor(scene,x,y,w,h,container,callback){
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.container = container;
        this.indexCheck =0;
        this.checkSpeed =0;
        this.checkSum =0;
        this.callback = callback;
        this.check(x,y);
        this.destroy
        this.container.each(function(obj){
            if(this.isCheck(this.x+obj.x,this.y+obj.y,this.w,this.w)){
                this.checkSum++;
            }
        }.bind(this));
        this.callback(this.checkSum);
    }

    isCheck(x,y,w,h){
        this.scene.add.rectangle(x,y,w,h)//.setStrokeStyle(10,0x00ff00);
        var overlapRect = this.scene.physics.overlapRect(x,y,w,h);
        if(overlapRect.length>0)return true;
        return false;
    }

    check(){
        var obj = this.container.list[this.indexCheck];
        var x= this.x + obj.x;
        var y= this.y + obj.y;
        var rect = this.scene.add.rectangle(x,y,obj.width,obj.height)//.setStrokeStyle(10,0x00ff00);
        this.scene.tweens.add({
            targets:rect,
            x:x,
            y:y,
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                rect.destroy();
                if(this.indexCheck < this.container.list.length-1){                    
                    this.indexCheck++;
                    this.check();   
                }
            }.bind(this)
        })
    }
}