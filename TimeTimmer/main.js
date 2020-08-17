var UPDATE_DELAY = 100;
var screen = new Screen(2,1.12,1,"black");//ratio_h, ratio_v, scale, backgroundColor
var objects = new ObjectContainer(screen,["clock"],10);//screen , objects,  fileCount
var clock_hour,clock_minute,clock_second;
var obj_time;
function main() {
	screen.init();
    screen.addContainer(objects);
    
    obj_time =new Array(6);
    for (let index = 0; index < obj_time.length; index++) {
        obj_time[index] = new Clock(ID.clock,Clock.NEW,150+index * 120,150,1);
        objects.add(obj_time[index]);
    }
    update();
}

function update() {
	var start = new Date().getTime();
	screen.draw();
	var delay = new Date().getTime() - start ;
    setTimeout(this.update, UPDATE_DELAY - delay);
    
    var date = new Date();
    var hours = date.getHours() % 12 || 12;
    if (hours<10) {hours   = "0"+hours;}
    var time = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    //time = time.replace(/:/g,"");
    time = time.split(':');
    time = hours + time[1] + time[2];
    //console.log(time);
    for (let index = 0; index < obj_time.length; index++) {
        obj_time[index].state = 
        {
            image : [time[index]],
            x : [0],
            y : [0],
        };
    }
}

window.onresize = function(event) {
	screen.init();
}