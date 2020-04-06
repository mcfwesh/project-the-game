let player;
let ball;
let defender = [];
let numberofDefenders = 20;
let defenderRows = 3;
let defenderColumns = 3;

function setup() {
  createCanvas(1100, 700);
  player = new Player();
  ball = new Ball();
  for (let i = 0; i < defenderColumns; i++) {
    defender.push(new Defender());
  }
  console.log(defender);
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
  for (let j = 0; j < defender.length; j++) {
    console.log(defender[j]);
    defender[j].display();
  }
}
