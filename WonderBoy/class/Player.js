class Player{
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){
        var sprite = scene.matter.add.sprite(x,y)
        .play('player_idle');
        sprite.setFixedRotation();
        sprite.setFriction(0);
        return sprite;
    }
}