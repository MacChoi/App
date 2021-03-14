class MainScene extends Phaser.Scene {
    constructor(){
        super({
            key:'MainScene',
            active:true,
        });
    }
    preload(){
        this.load.image('brush', 'assets/images/brush.png');
    }
    create(){
        var rt = this.add.renderTexture(0, 0, WIDTH, HEIGHT);
        var brush = this.textures.getFrame('brush');
        this.input.on('pointerdown', function (pointer) {
            rt.draw(brush, pointer.x - 16, pointer.y - 16, 1, 0x000000);
        }, this);

        this.input.on('pointermove', function (pointer) {
            if (pointer.isDown){
                var points = pointer.getInterpolatedPosition(3);
                points.forEach(function (p) {
                    rt.draw(brush, p.x - 16, p.y - 16, 1, 0x000000);
                });
            }
        }, this);

        var clear = this.add.text(WIDTH-200, HEIGHT-100, 'Clear');
        clear.setColor('0x000000').setFontFamily('Arial').setFontSize(64).setInteractive();
        clear.on('pointerup', function (pointer) {
            rt.clear();
        }.bind(this));
    }
}