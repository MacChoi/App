class CheckStone{
    constructor(scene,px,py){
        this.scene = scene;
        this.px = px;
        this.py = py;
        this.cellWidth =this.scene.cellWidth;
        this.cellHeight = this.scene.cellHeight;
        this.checkSpeed =0;
        this.checkArray = [
            [this.cellWidth,0],
            [0,this.cellHeight],
            [this.cellWidth,this.cellHeight],
            [this.cellWidth,-this.cellHeight],
        ]
        this.indexCheckArray =0;
        this.direction =-1;
        this.checkSum =0;

        this.checkStone(px,py)
    }

    checkStone(px,py){
        var x= (px/this.cellWidth).toFixed() * this.cellWidth;
        var y= (py/this.cellHeight).toFixed() * this.cellHeight;
        var rect = this.scene.add.rectangle(x,y,20,20).setStrokeStyle(2,0x00ff00);

        this.scene.tweens.add({
            targets:rect,
            x:rect.x + (this.checkArray[this.indexCheckArray][0] * this.direction),
            y:rect.y + (this.checkArray[this.indexCheckArray][1] * this.direction),
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                rect.destroy();
                var stone = this.scene.isStone(rect.x,rect.y);
                if(stone){
                    var stoneColor = this.scene.isWhite == true?'black':'white';
                    if(stoneColor == stone.gameObject.texture.key){
                        this.checkSum ++;
                        this.checkStone(rect.x,rect.y);
                    }else{
                        this.reverseCheck();
                    }
                }else{
                    this.reverseCheck();
                }
            }.bind(this)
        })
    }

    reverseCheck(){
        if(this.direction == -1){
            this.direction =1;
            this.checkStone(this.px,this.py);
        }else if(this.direction ==1){
            if(this.checkSum >=4){
                alert(this.scene.isWhite == true?'Win!!! Black':'Win!!! White');
                this.scene.clearStone();
                return;
            }
            if(this.indexCheckArray <this.checkArray.length -1){
                this.checkSum = 0;
                this.direction =-1;
                this.indexCheckArray++;
                this.checkStone(this.px,this.py);
            }
        }
    }
}