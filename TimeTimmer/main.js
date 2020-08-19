var UPDATE_DELAY = 100;
var screen = new Screen(1,1,4,"white");//ratio_h, ratio_v, scale, backgroundColor
var objects = new ObjectContainer(screen,["timer"],3);//screen , objects,  fileCount
var minute =new Array(360);
function main() {
	screen.init();
    screen.addContainer(objects);
    var board = new Timer(ID.timer,Timer.BOARD,0,0,1);
    var arrow = new Timer(ID.timer,Timer.ARROW,0,0,1);

    objects.add(board);
    for (let index = 0; index < minute.length; index++) {
        minute[index] = new Timer(ID.timer,Timer.MINUTE,0,0,1);
        minute[index].state ={
            image : [0],
            rotate : [index]
        };
        objects.add(minute[index]);
    }
    objects.add(arrow);
    update();
}

function update() {
	var start = new Date().getTime();
	screen.draw();
	var delay = new Date().getTime() - start ;
    setTimeout(this.update, UPDATE_DELAY - delay);
}

window.onresize = function(event) {
	screen.init();
}