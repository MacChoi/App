var UPDATE_DELAY = 100;
var screen = new Screen(2,1.12);
var objects = new ObjectContainer(screen,["clock"]);

var clock_hour,clock_minute,clock_second;
function main() {
	screen.init();
    screen.addContainer(objects);
    
    var clock_board = new Clock(ID.clock,Clock.BOARD,0,0,1);
    objects.add(clock_board);

    clock_hour = new Clock(ID.clock,Clock.HOUR,65,-10,1);
    objects.add(clock_hour);
    
    clock_minute = new Clock(ID.clock,Clock.MINUTE,65,-10,1);
    objects.add(clock_minute);

    clock_second = new Clock(ID.clock,Clock.SECOND,65,-10,1);
    objects.add(clock_second);
    update();
}

function update() {
	var start = new Date().getTime();
	screen.draw();
	var delay = new Date().getTime() - start ;
    setTimeout(this.update, UPDATE_DELAY - delay);
    
    var date = new Date();
    clock_hour.state.rotate = [date.getHours()*6];
    clock_minute.state.rotate = [date.getMinutes()*6];
    clock_second.state.rotate = [date.getSeconds()*6];
}

window.onresize = function(event) {
	screen.init();
}