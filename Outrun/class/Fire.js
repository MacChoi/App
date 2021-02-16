class Fire extends Phaser.GameObjects.Sprite{
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){ 
        return scene.physics.add.sprite(x,y,new Fire(scene,x,y,this.name.toLowerCase() ))
        .play(this.name.toLowerCase()+'_idle');
    }
}