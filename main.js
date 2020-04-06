let player;
let ball;
function setup() {
  createCanvas(1100, 700);
  player = new Player();
  ball = new Ball();
}

function draw() {
  clear();
  stroke(3);
  strokeWeight(3);
  rect(0, 0, width, height);
  player.display();
  player.checkMove();
  ball.display();
  ball.move();
  ball.playerMeet();
}
