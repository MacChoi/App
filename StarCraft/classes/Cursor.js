class Cursor extends Phaser.GameObjects.Sprite {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        this.scene = scene;
    
        scene.add.existing(this);
        scene.anims.fromJSON(scene.cache.json.get(this.constructor.name));
        var sprite = scene.physics.add.sprite(x,y);
        sprite.setScale(2).setDepth(1).play('idle');
        sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, sprite, frameKey) {
            sprite.body.setSize(sprite.width,sprite.height)
        }, this);  
    }
}