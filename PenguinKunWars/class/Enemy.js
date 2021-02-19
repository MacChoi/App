class Enemy{
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){
        var sprite = scene.physics.add.sprite(x,y)
        .play('enemy_idle');
		sprite.setVelocityX(50);
        sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            sprite.body.setSize(sprite.width,sprite.height)

			if(sprite.x<50){
                sprite.setVelocityX(50);
            }else if(sprite.x>200){
                sprite.setVelocityX(-50);
            }
        }, this);
        
        return sprite;
    }
}