class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y,texture,direction,scale) {
		super(scene,x,y,texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(scale);
        this.setBounce(1,1);
        this.setGravityY(100 / (scale*0.1));
        this.setVelocityX(200 * direction);
        this.setVelocityY(200);
        this.setCollideWorldBounds(true);
        this.body.customBoundsRectangle = scene.gameBounds;
    }
}