class Ball{
    static preload(scene){
        scene.load.image('ball', 'ball/1.png');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){
        const bounds=new Phaser.Geom.Rectangle(20,25,scene.game.config.width-40,scene.game.config.height-50);

        var sprite = scene.physics.add.sprite(x,y,'ball');
        sprite.setBounce(1,1);
        sprite.setVelocityX(100);
        sprite.setVelocityY(100);
        sprite.setCollideWorldBounds(true);
        sprite.body.customBoundsRectangle=bounds;
        sprite.play('ball_idle');

        sprite.setDepth(-1);
        sprite.body.checkCollision.up=false;
        sprite.body.checkCollision.down=false;
        sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            sprite.setScale((sprite.y *0.02));
            sprite.body.setSize(sprite.width,sprite.height);

            if(sprite.y<35 || sprite.y>150){
                sprite.setVelocityY(0);
                sprite.setVelocityX(0);
            }
        }, this);
        return sprite;
    }
}