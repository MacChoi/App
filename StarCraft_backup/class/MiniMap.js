class MiniMap{
    static preload(scene){
    }
    static create(scene,x,y){
        scene.add.image(x+10,y+10, 'bg').setOrigin(0).setScale(0.30)
    }
}