class MainScene extends Phaser.Scene {
    constructor(){
        super({
            key:'MainScene',
        });
    }

    preload(){
        this.load.image('key', 'assets/images/key/key.png');
    }

    create(){
        EMITTER.on('keydown', this.onkeydown, this);
        var style = {
            fontSize: '30px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#000000'
        };
        this.led=this.add.text(0, 0,"",style).setPadding(10);
        var group = this.add.group();
        var num_table=[
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0","=","C","+",
            ];
        for (var i = 0; i < num_table.length; i++) {
            var text =this.add.text(5,0,num_table[i]);
            var key=new KeySprite(this,10,10,'key',num_table[i]);
            var container=this.add.container(0,0, [ key, text ]);
            group.add(container);
        }

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 4,
            height: 10,
            cellWidth: 60,
            cellHeight: 60,
            x: 50,
            y: 100
        });

        this.sum = new Array();
    }

    onkeydown(key){
        if(key.num == '/'|key.num == '*'|key.num == '-'|key.num == '+'){
            this.sum.push(this.led.text);
            this.led.text='';
            this.sum.push(key.num);
        }else if(key.num == '='){
            this.sum.push(this.led.text);
            var sumtext='';
            this.sum.forEach(element => {
                sumtext+=element;
            });
            this.led.text=eval(sumtext);
            this.sum = new Array();
        }else if(key.num == 'C'){
            this.led.text='';
        }else{
            this.led.text+=key.num;
        }
    }
}