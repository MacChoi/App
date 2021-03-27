class MainScene extends Phaser.Scene {
    constructor(){
        super({
            key:'MainScene',
        });
    }

    preload(){
        this.load.image('gom', 'assets/images/1.png');

    }

    create(){
        this.add.image(WIDTH/2, HEIGHT/2, 'gom');

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
            widthSegments: 6
        });

        mesh.hideCCW = false;
        mesh.modelRotation.set(2.604, 0.427, 0);
        mesh.viewPosition.set(0, 0, 2.833);

        const rotateRate = 1;
        const panRate = 1;
        const zoomRate = 4;

        window.mesh = mesh;

        this.add.text(16, 16, 'Drag mouse to Rotate (+ Shift to pan)\nWheel to zoom');

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

            mesh.panZ(deltaY * (zoomRate / 600));

        });

        var tween = this.tweens.add({
            targets: mesh,
            rotationY: 10,
            ease: 'Power1',
            duration: 3000,
            yoyo: true,
            // repeat: 1,
            onStart: function () { console.log('onStart'); console.log(arguments); },
            onComplete: function () { console.log('onComplete'); console.log(arguments); },
            onYoyo: function () { console.log('onYoyo'); console.log(arguments); },
            onRepeat: function () { console.log('onRepeat'); console.log(arguments); },
        });
    }

    update(time, delta){
        var gameScene = this.scene.get('MainScene');
console.log("delta")
        this.rt.clear();

        this.rt.draw(gameScene.children, 0, 0);
    }
}