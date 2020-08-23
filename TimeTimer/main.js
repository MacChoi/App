var screen = new Screen(1,1);//ratio_h, ratio_v
var objects = new ObjectContainer(screen,["timer","arrow",],4);//screen , objects,  fileCount
var minute =new Array(360);
function main() {
    screen.setScale(4);
	screen.init();
    screen.addContainer(objects);

    var board = new Timer(ID.timer,Timer.BOARD,0,0);
    var arrow = new Arrow(ID.arrow,Arrow.NEW,0,0);
    objects.add(board);
    for (let index = 0; index < minute.length; index++) {
        minute[index] = new Timer(ID.timer,Timer.MINUTE,0,0);
        minute[index].state ={
            image : [0],
            rotate : [index]
        };
        objects.add(minute[index]);
    }
    objects.add(arrow);
}