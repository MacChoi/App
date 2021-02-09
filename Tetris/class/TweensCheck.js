class TweensCheck{
    constructor(scene,px,py,array,callback){
        this.scene = scene;
        this.px = px;
        this.py = py;
        this.checkArray = array;
        this.indexCheck =0;
        this.checkSpeed =0;
        this.checkSum =0;
        this.callback = callback;

        // for(var i = 0; i < this.checkArray.length; i++){
        //     this.checkArray[i].body.enable = false;
        // }

        this.check(px,py);
    }

    isCheck(x,y){
        var rect = this.scene.add.rectangle(x-10,y-10,20,20)//.setStrokeStyle(10,0x00ff00);
        var overlapRect = this.scene.physics.overlapRect(x-10,y-10,20,20);
        if(overlapRect.length>0)return true;
        return false;
    }

    check(px,py){
        var obj = this.checkArray[this.indexCheck];
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
                if(this.isCheck(rect.x,rect.y)){
                    this.checkSum++;
                }
                if(this.indexCheck < this.checkArray.length-1){                    
                    this.indexCheck++;
                    this.check(this.px,this.py);   
                }else{
                    this.callback(this.checkSum);
                    this.indexCheck =0;
                    this.checkSum =0;
                }
            }.bind(this)
        })
    }
}