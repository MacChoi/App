class Player{
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){
        var sprite = scene.matter.add.sprite(x,y)
        .play('player_idle');
        // sprite.setFixedRotation();
        // console.log(sprite.body)
        sprite.body.ignoreGravity=false;


        //  sprite.body.force.y=-10;
        // sprite.angle=30;
        // sprite.restitution=10;
        // sprite.frictionAir=0;
        // sprite.setStatic(true);
        // sprite.setBounce(0.05);
        // sprite.setFriction(0);
        sprite.setMass(10);
  
        sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            // sprite.body.setSize(sprite.width,sprite.height)
        }, this);
        
        return sprite;
    }
}