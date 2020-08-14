var UPDATE_DELAY = 100;
var screen = new Screen(1,2);
var objects = new ObjectContainer(screen,["player","map"]);
var pad = new ObjectContainer(screen,["control"]);
function main() {
	screen.init();
	screen.addContainer(objects);
	screen.addContainer(pad);

	new MAP(objects);
	new ControlPad(pad);
	var player = new PLAYER(ID.player,PLAYER.NEW,0,0,-1);
	objects.add(player);

	var player2 =new PLAYER(2,PLAYER.NEW,100,10,-1);
	player2.onKeydown = null;
	player2.onDraw = null;
	objects.add(player2);

	var player3 =new PLAYER(3,PLAYER.NEW,100,80,-1);
	player3.onKeydown = null;
	player3.onDraw = null;
	objects.add(player3);
	
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

File.appendLoading();
File.onLoading = function (count){
	if(count==10)File.removeLoading();
	// console.log("onLoading :" +count);
};