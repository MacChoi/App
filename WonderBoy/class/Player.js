class Player extends Phaser.Physics.Matter.Sprite{
    static preload(scene){
        scene.load.setPath('./assets/images');
        scene.load.atlas(this.name.toLowerCase() , this.name.toLowerCase() +'/sprites.png', this.name.toLowerCase() +'/sprites.json');
        scene.load.animation('anims_'+this.name.toLowerCase() , this.name.toLowerCase() +'/anims.json');
    }

    constructor(scene,x,y,texture) {
		super(scene.matter.world,x,y,texture);
		this.setTexture(texture)
		scene.add.existing(this);
        this.setSensor(scene);
        this.play('player_idle');
        this.setFixedRotation();
        this.setFriction(0);
	}

    setSensor(scene){
        var cx = this.width / 2;
        var cy = this.height / 2;
        var playerBody =  Phaser.Physics.Matter.Matter.Bodies.rectangle(cx,cy, 10, 30, { chamfer: { radius: 10 } });
        this.sensorBottom =  Phaser.Physics.Matter.Matter.Bodies.rectangle(cx, this.height, 5, 5, { isSensor: true });
        var compoundBody =  Phaser.Physics.Matter.Matter.Body.create({
            parts: [
                playerBody, this.sensorBottom
            ],
        });
        this.setExistingBody(compoundBody);
       
        scene.matter.world.on('collisionactive', function (event) {
            for (var i = 0; i < event.pairs.length; i++){
                var bodyA = event.pairs[i].bodyA;
                var bodyB = event.pairs[i].bodyB;
                if (bodyA === this.sensorBottom || bodyB === this.sensorBottom){
                    this.isSensorBottom=true;
                }
            }
        }.bind(this));
    }
}