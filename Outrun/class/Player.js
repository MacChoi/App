class Player extends Phaser.GameObjects.Sprite{
    static preload(){
        game.scene.scenes[0].load.setPath('./assets/images');
        game.scene.scenes[0].load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        game.scene.scenes[0].load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){ 
        return scene.physics.add.sprite(x,y,new Player(scene,x,y,this.name.toLowerCase() ))
        .setScale(2).play(this.name.toLowerCase()+'_idle');
    }
}