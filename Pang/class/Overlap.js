class Overlap{
    constructor(scene,x,y,w,h,callback){
        var overlapRect = scene.physics.overlapRect(x,y,w,h);
        overlapRect.forEach(function(obj){
            callback(obj);
        });              
    }   
}