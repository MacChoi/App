class Marine extends Unit {
    constructor (scene,x,y,key) {
        super(scene,x,y,key);
        this.scene=scene;
    }

    onPointerup(pointer){
        this.setState('move',pointer.x,pointer.y);
        this.moveTo(pointer.x,pointer.y);
    }
}