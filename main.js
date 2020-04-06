let player;
let ball;
let defender;
function setup() {
  createCanvas(1100, 700);
  player = new Player();
  ball = new Ball();
  defender = new Defender();
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
  ball.wallMeet();
  ball.playerMeet(player);
  defender.display();
}
