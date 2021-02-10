class TweensCheck{
    constructor(scene,px,py,container,callback){
        this.scene = scene;
        this.px = px;
        this.py = py;
        this.container = container;
        this.indexCheck =0;
        this.checkSpeed =0;
        this.checkSum =0;
        this.callback = callback;
        this.check(px,py);

        this.container.each(function(obj){
            if(this.isCheck(this.px+obj.x,this.py+obj.y,obj.width,obj.height)){
                this.checkSum++;
            }

        }.bind(this));
        this.callback(this.checkSum);
    }

    isCheck(x,y,w,h){
        var gap =w/2;
        var rect = this.scene.add.rectangle(x,y,w-(gap*2),h-(gap*2)).setStrokeStyle(gap,0x00ff00);
        var overlapRect = this.scene.physics.overlapRect(x,y,w-(gap*2),h-(gap*2));
        if(overlapRect.length>0)return true;
        return false;
    }

    check(px,py){
        var obj = this.container.list[this.indexCheck];
        var x= this.px + obj.x;
        var y= this.py + obj.y;
        var rect = this.scene.add.rectangle(x,y,obj.width,obj.height).setStrokeStyle(20,0x00ff00);
        this.scene.tweens.add({
            targets:rect,
            x:x,
            y:y,
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                rect.destroy();
                // if(this.isCheck(rect.x,rect.y,obj.width,obj.height)){
                //     this.checkSum++;
                // }
                if(this.indexCheck < this.container.list.length-1){                    
                    this.indexCheck++;
                    this.check(this.px,this.py);   
                }else {
                    // this.callback(this.checkSum);
                    // this.indexCheck =0;
                    // this.checkSum =0;
                }
            }.bind(this)
        })
    }
}