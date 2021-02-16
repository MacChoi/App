class Enemy extends Phaser.GameObjects.Sprite{
    static preload(){
        game.scene.scenes[0].load.setPath('./assets/images');
        game.scene.scenes[0].load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        game.scene.scenes[0].load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    static create(scene,x,y){ 
        return scene.physics.add.sprite(x,y,new Player(scene,x,y,this.name.toLowerCase() ))
        .play(this.name.toLowerCase()+'_idle');
    }

    setTarget(target){
		this.target = target
	}

	update(){
		if (!this.target)
		{
			return
		}

		const tx = this.target.x
		const ty = this.target.y

		const x = this.x
		const y = this.y

		const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
		this.setRotation(rotation)
	}
}