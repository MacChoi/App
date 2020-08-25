let screen = new Screen(1,1.2);
let objects = new ObjectContainer(screen,["background","ball","player","block"],15);
function main(){
    screen.setScale(5.7);
    screen.init();
    screen.addContainer(objects);

    let back = new Background(ID.background,Background.NEW,0,0);
    let top = new Wall(ID.background,Wall.TOP,0,0);
    let left = new Wall(ID.background,Wall.LEFT,0,8);
    let right = new Wall(ID.background,Wall.LEFT,168,8);
    objects.add(back);
    objects.add(top);
    objects.add(left);
    objects.add(right);

    let ball = new Ball(ID.ball,Ball.NEW,80,180);
    objects.add(ball);

    let player = new Player(ID.player,Player.NEW,80,200);
    objects.add(player);

    new Blocks(objects);
}