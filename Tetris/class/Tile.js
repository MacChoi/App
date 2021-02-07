class Tile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture){
        super(scene, x, y, texture)
        // scene.add.existing(this)
        // scene.physics.add.existing(this)
        this.scene = scene;
        this.checkSpeed =1000;
        this.initTile(x,y);

        eventsCenter.on('keyup', this.anyKey, this);
    }
   
    anyKey (event){
        let code = event.keyCode;
        switch (code) {
            case Phaser.Input.Keyboard.KeyCodes.LEFT:
                this.moveTile(-1);
            break;
            case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                this.moveTile(1);
            break;
            case Phaser.Input.Keyboard.KeyCodes.SPACE:
                this.rotateTile();
            break;
        }
    }

    initTile(px,py){
        this.isHit =false;
        const HSV = Phaser.Display.Color.HSVColorWheel();
        this.type = Phaser.Math.Between(0, 6);
        this.color = HSV[50 * this.type].color;

        const offsets = [
            [[0,-1],[0,0],[0,1],[1,1]], // L
            [[0,-1],[0,0],[0,1],[-1,1]], // J
            [[-1,0],[0,0],[1,0],[2,0]], // I
            [[-1,-1],[0,-1],[0,0],[-1,0]], // 0
            [[-1,0],[0,0],[0,-1],[1,-1]],// S
            [[-1,0],[0,0],[1,0],[0,1]], // T
            [[-1,-1],[0,-1],[0,0],[1,0]] // Z
        ];

        this.tileGroup = this.scene.physics.add.group();
        this.container = this.scene.add.container(px, py);
     
        for (let index = 0; index < offsets[this.type].length; index++) {
            const element = offsets[this.type][index];
            var x = element[0] *this.scene.tileWidth;
            var y = element[1] *this.scene.tileHeight;
            var image = this.scene.physics.add.sprite(x ,y, "tile");
            this.tileGroup.add(image);
            this.container.add(image);
        }
 
        this.tileGroup.children.each(function(obj) {
            obj.setTint(this.color);
        }, this);

        this.tileGroupCollider = this.scene.physics.add.collider(this.tileGroup, this.scene.bgGroup,this.bgHit,null,this);
         this.checkTile(px,py);
    }

    bgHit(tile,bgTile){
        this.isHit = true;
    }

    remove(){
        // this.tileGroup.setVelocityX(0);
        this.scene.physics.world.removeCollider(this.tileGroupCollider);
    }
    
    checkTile(px,py){
        this.tween = this.scene.tweens.add({
            targets:this.container,
            y:this.container.y + this.scene.tileHeight,
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                if(this.isHit){
                    this.scene.physics.world.removeCollider(this.tileGroupCollider);
                }else{
                    this.checkTile(this.container.x,this.container.y);
                }
            }.bind(this)
        })
    }

    checkTile(px,py){
        this.tween = this.scene.tweens.add({
            targets:this.container,
            y:this.container.y + this.scene.tileHeight,
            duration:this.checkSpeed,
            onComplete:function(tween,tergets){
                if(this.isHit){
                    this.isHit =false;
                    this.scene.physics.world.removeCollider(this.tileGroupCollider);
                }else{
                    this.checkTile(this.container.x,this.container.y);
                }
            }.bind(this)
        })
    }
    
    rotateTile(){
        this.tween = this.scene.tweens.add({
            targets:this.container,
            angle: this.container.angle + 90,
            duration:30,
            onComplete:function(tween,tergets){
               
            }.bind(this)
        })
    }

    moveTile(direction){
        this.container.setPosition(this.container.x + (this.scene.tileWidth * direction), this.container.y);

        // this.tween = this.scene.tweens.add({
        //     targets:this.container,
        //     x: this.container.x + (this.scene.tileWidth * direction),
        //     duration:this.checkSpeed,
        //     onComplete:function(tween,tergets){
               
        //     }.bind(this)
        // })
    }
}