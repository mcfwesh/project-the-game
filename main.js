let player;
let ball;
let defender = [];
let midfielder = [];
let attacker = [];
let numberofDefenders = 20;
let defenderRows = 4;
let midfielderRows = 3;
let attackerRows = 3;
let pitchImage;
let countDefenders = 5;
let countMidfielders = 3;
let countAttackers = 2;

function preload() {
  pitchImage = loadImage("assets/half-rotate.png");
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  background(100);
  player = new Player();
  ball = new Ball();

  for (let j = 0; j < defenderRows; j++) {
    defender.push(new Defender(350 + 200 * j));
  }
  for (let j = 0; j < midfielderRows; j++) {
    midfielder.push(new Midfielder(425 + 200 * j));
  }
  for (let j = 0; j < attackerRows; j++) {
    attacker.push(new Attacker(455 + 100 * j));
  }
}

let startScreen = false; // change to true

function draw() {
  clear();
  if (startScreen) {
    // Your code for displaying the start screeen
    // Button: Start => click => startScreen = false

    return;
  }
  image(pitchImage, 0, 0, width, height);
  stroke(3);
  strokeWeight(3);
  player.display();
  player.checkMove();
  ball.display();
  ball.move();
  ball.wallMeet();
  ball.playerMeet(player);
  for (let i = 0; i < defender.length; i++) {
    defender[i].display();
    defender[i].move();
    for (let def of defender) {
      if (defender[i].x != def.x) {
        defender[i].collissions(def);
      }
    }
    if (ball.hitOpponent(defender[i])) {
      ball.directionY *= -1;
      ball.directionX *= -1;
      countDefenders--;
      if (countDefenders <= 0) {
        defender.splice(i, 1);
      }
    }
  }
  for (let i = 0; i < midfielder.length; i++) {
    midfielder[i].display();
    midfielder[i].move();
    for (let mid of midfielder) {
      if (midfielder[i].x != mid.x) {
        midfielder[i].collissions(mid);
      }
    }
    if (ball.hitOpponent(midfielder[i])) {
      ball.directionY *= -1;
      ball.directionX *= -1;
      countMidfielders--;
      if (countMidfielders <= 0) midfielder.splice(i, 1);
    }
  }
  for (let i = 0; i < attacker.length; i++) {
    attacker[i].display();
    attacker[i].move();
    for (let att of attacker) {
      if (attacker[i].x != att.x) {
        attacker[i].collissions(att);
      }
    }
    if (ball.hitOpponent(attacker[i])) {
      ball.directionY *= -1;
      ball.directionX *= -1;
      countAttackers--;
      if (countAttackers <= 0) attacker.splice(i, 1);
    }
  }
}
