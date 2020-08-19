var UPDATE_DELAY = 100;
var screen = new Screen(2,1.12,1,"red");//ratio_h, ratio_v, scale, backgroundColor
var objects = new ObjectContainer(screen,["timer"],3);//screen , objects,  fileCount

function main() {
	screen.init();
    screen.addContainer(objects);
    var board = new Timer(ID.timer,Timer.BOARD,0,0,1);
    objects.add(board);
  
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