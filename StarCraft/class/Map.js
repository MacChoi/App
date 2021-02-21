class Map{
    static preload(scene){
        scene.load.image('bg', './assets/images/map/1.png');
    }

    static create(scene,x,y){
       return scene.add.image(x,y, 'bg').setOrigin(0).setScale(3).setDepth(-1);
    }
}