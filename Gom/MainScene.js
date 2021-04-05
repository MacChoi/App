class MainScene extends Phaser.Scene {
    constructor(){
        super({
            key:'MainScene',
        });
    }

    preload(){

        this.load.image('test', ['assets/images/face/1.png', 'assets/images/face/2.png']);
        this.load.image('face', 'assets/images/face/face.png');
        this.load.image('eye1', 'assets/images/face/eye1.png');
        this.load.image('eye2', 'assets/images/face/eye2.png');
        this.load.image('mouth', 'assets/images/face/mouth.png');
        this.load.image('tongue', 'assets/images/face/tongue.png');
    
        this.wavebell = new WaveBell();
    }

    
    create(){
        const app = new PIXI.Application({
            width: WIDTH, height: HEIGHT,
            view: document.getElementById('canvas_1')});
     
        var img = new PIXI.Sprite.from('assets/images/face/1.png');
        img.width = WIDTH/2;
        img.height = HEIGHT/2;
        img.x=100;
        var depthMap = new PIXI.Sprite.from('assets/images/face/2.png');
        depthMap.width = WIDTH/2;
        depthMap.height = HEIGHT/2;
        depthMap.x=100;
        app.stage.addChild(img);
        app.stage.addChild(depthMap);

        var displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
        app.stage.filters = [displacementFilter];
    
        this.input.on('pointermove', function (pointer)  {
            // console.log("pointermove" , pointer)
                displacementFilter.scale.x = (window.innerWidth / 2 - pointer.event.clientX) /20;
                displacementFilter.scale.y = (window.innerHeight / 2 - pointer.event.clientY) /20;
        }.bind(this));


        this.tweens.addCounter({
            from: -200,
            to: 200,
            duration: 1500,
            yoyo:true,
            repeat:-1,
            onUpdate:function(tween){
                displacementFilter.scale.x = (window.innerWidth / 2 - tween.getValue()) /20;
                // displacementFilter.scale.y = (window.innerHeight / 2 - Phaser.Math.Between(-300,300)) /20;
            }
        });

        this.tweens.addCounter({
            from: -200,
            to: 200,
            duration: 5000,
            yoyo:true,
            repeat:-1,
            onUpdate:function(tween){
                // displacementFilter.scale.x = (window.innerWidth / 2 - tween.getValue()) /20;
                displacementFilter.scale.y = (window.innerHeight / 2 - tween.getValue()) /20;
            }
        });

        var x=WIDTH/2;
        var y=HEIGHT/2 +100;

        this.face= this.add.image(0,0, 'face');
        var eye1= this.add.image(-13,-13, 'eye1');
        var eye2= this.add.image(15,-12, 'eye2');
        this.mouth= this.add.image(0,8, 'mouth').setOrigin(0.5,0);
        // this.tongue= this.add.image(0,55, 'tongue');

        this.container = this.add.container(x,y);

        var shuffleTest = [ this.face, eye1, eye2 ,this.mouth ,];
        
        this.container.add(shuffleTest);
     

        this.tweens.add({
            targets: [eye1],
            scaleY: 0.1,
            ease: 'Circ.easeInOut',
            duration: 3000,
            yoyo:true,
            repeat: -1,
        });

        this.input.on('pointerdown', function (pointer) {
            if (this.wavebell.state === 'inactive') {
                this.wavebell.start(1000 / 25);
            }

        }.bind(this));

        this.wavebell.on('wave', function (e) {
            // if(e.value * 100 < 10)return;
            console.log(Math.round(e.value * 100) + '%')
            // this.tongue.setScale(3,3);
           
            this.mouth.scaleY=e.value*3;
            // // if(this.ani!=undefined)this.ani.stop();
            // this.ani=this.tweens.add({
            //     // targets: Phaser.Math.RND.shuffle(shuffleTest),
            //     targets:this.mouth,
            //     // angle: 5,
            //     scaleY:1,
            //     ease: 'Circ.easeInOut',
            //     duration: 3000,
            //     yoyo:true,
            //     // repeat: -1,
            // });
        }.bind(this));

        this.wavebell.on('start', function () {
   
        });
        this.wavebell.on('stop', function () {
        
        });
    }
}

class RenderScene extends Phaser.Scene{
    constructor(){
        super({
            key:'RenderScene',
            active:true
        });
    }
    create (){
        this.scene.setVisible(false, 'MainScene');

        this.rt = this.make.renderTexture({ x: 0, y: 0, width: 800, height: 600 }, false);

        this.rt.saveTexture('game');

        const mesh = this.add.mesh(400, 300, 'game');

        Phaser.Geom.Mesh.GenerateGridVerts({
            mesh,
            widthSegments: 20
        });

        mesh.hideCCW = false;
        mesh.modelRotation.set(2.5, 0.0, 0.0);
        mesh.viewPosition.set(0, 0, 1);

        const rotateRate = 1;
        const panRate = 2;
        const zoomRate = 4;


        this.input.on('pointermove', pointer => {

            if (!pointer.isDown)
            {
                return;
            }

            if (!pointer.event.shiftKey)
            {
                mesh.modelRotation.y += pointer.velocity.x * (rotateRate / 800);
                mesh.modelRotation.x += pointer.velocity.y * (rotateRate / 600);
            }
            else
            {
                mesh.panX(pointer.velocity.x * (panRate / 800));
                mesh.panY(pointer.velocity.y * (panRate / 600));
            }

        });

        this.input.on('wheel', (pointer, over, deltaX, deltaY, deltaZ) => {
            mesh.panZ(deltaY * (zoomRate / 1000));
        });

        // var tween = this.tweens.add({
        //     targets: mesh,
        //     rotationY: 10,
        //     ease: 'Power1',
        //     duration: 3000,
        //     yoyo: true,
        //     // repeat: 1,
        //     // onStart: function () { console.log('onStart'); console.log(arguments); },
        //     // onComplete: function () { console.log('onComplete'); console.log(arguments); },
        //     // onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
        //     // onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        // });
    }

    update(time, delta){
        var gameScene = this.scene.get('MainScene');
        this.rt.clear();

        this.rt.draw(gameScene.children, 100, 0);
    }
}