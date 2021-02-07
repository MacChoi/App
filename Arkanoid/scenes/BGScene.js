// export default 
class BGScene extends Phaser.Scene {
    constructor () {
        super({
            key:'BGScene',
            active: true, 
        });
    }
    
    preload(){
        this.load.setPath('./assets/images');
        
        this.load.image('bg', 'bg/bg.png');
        this.load.image('player', 'player/player.png');
        this.load.image('ball', 'ball/ball.png');
        this.load.image('block', 'block/block.png');
    }

    create (){
        var config_height = this.game.config.height;
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.world.on("worldbounds", function (body) {
            if (body) {
                if (body.gameObject.texture.key === 'ball') {
                    if (config_height <= body.position.y) {
                        body.setVelocity(-300, -150);
                        body.gameObject.setPosition(90, 180);
                        // console.log('Game Over ' +config_height  + " " +body.position.y);
                    }
                }
            }
        });

        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.player = this.physics.add.image(90, 200, 'player').setImmovable();
        this.input.on('pointermove', pointer => {
            this.player.x = Phaser.Math.Clamp(pointer.x, this.player.width / 2, this.game.config.width - this.player.width / 2);
        });

        this.ball = this.physics.add.image(90, 200, 'ball')
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setVelocity(-300, -150);
    
        this.block = this.physics.add.staticGroup({
            key: 'block',
            frameQuantity: 45,
            gridAlign: { width:9, cellWidth: 15, cellHeight: 7, x: 30, y: 30 }
        });

        const HSV = Phaser.Display.Color.HSVColorWheel();
        this.block.children.iterate(function (child, index) {
            child.setTint(HSV[5 * index].color);
        }, this);

        this.physics.add.collider(this.ball, this.player, this.playerHit, null, this);
        this.physics.add.collider(this.ball, this.block, this.blockHit, null, this);
    }

    blockHit(ball,block) {
        block.destroy();

        if(this.block.children.size == 0){
            this.scene.restart();
        }

        console.log(this.block.children.size);
       
    }
    
    playerHit(ball,player) {
        var diff = 0;
        if (ball.x < player.x) {
            diff = player.x - ball.x;
            ball.setVelocityX(-20 * diff);
        } else if (ball.x > player.x) {
            diff = ball.x - player.x;
            ball.setVelocityX(20 * diff);
        } else {
            ball.setVelocityX(2 + Math.random() * 10);
        }
    }
}