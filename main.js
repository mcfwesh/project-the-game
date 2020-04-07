let player;
let ball;
let defender = [];
let midfielder = [];
let attacker = [];
let numberofDefenders = 20;
let defenderRows = 4;
let midfielderRows = 3;
let attackerRows = 3;
let items = [];
let pitchImage;
let countDefenders = 2;
let countMidfielders = 3;
let countAttackers = 2;
let bootImage = "assets/boot.png";
let waterImage = loadImage("assets/water.png");
let redcardImage = loadImage("assets/red-card.png");
let yellowcardImage = loadImage("assets/yellow-card.png");
let medalImage = loadImage("assets/medal.png");
let healthImage = loadImage("assets/health.png");
let rewardObject = [
  { img: bootImage, reward: "small ball" },
  { img: waterImage, reward: "slow ball" },
  { img: redcardImage, reward: "small player" },
  { img: yellowcardImage, reward: "quick ball" },
  { img: medalImage, reward: "big player" },
];
let randomNumber = Math.floor(Math.random() * rewardObject.length + 1);

let level = 0;

function preload() {
  pitchImage = loadImage("assets/half-rotate.png");
  // rewardObject[0].img = loadImage(rewardObject[0].img);
  for (let i = 0; i < rewardObject.length; i++) {
    rewardObject[i].img = loadImage(rewardObject[i].img);
  }
}
function setup() {
  console.log(rewardObject[0].img);
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  background(100);
  player = new Player();
  ball = new Ball();

  for (let j = 0; j < defenderRows; j++) {
    defender.push(new Defender(350 + 200 * j));
  }
  for (let j = 0; j < midfielderRows; j++) {
    midfielder.push(new Midfielder(425 + 300 * j));
  }
  for (let j = 0; j < attackerRows; j++) {
    attacker.push(new Attacker(455 + 300 * j));
  }
  // for (let j = 0; j < 20; j++) {
  //   items.push(new Items(50, 50));
  //   console.log(items);
  // }
}

let startScreen = false; // change to true

function draw() {
  //if(level === 0) {
  //  image() start
  //} else if (level < 0) {
  // image() game over
  // } else {
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
  if (items.length > 0) {
    items.forEach((item) => item.display());
    items.forEach((item) => item.move());
  }
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
      defender[i].count--;
      console.log(defender[i].count);
      if (defender[i].count <= 0) {
        // Get a random number that is from 0 and to the length -1 of the array of objects
        let newItem = new Items(
          defender[i].x,
          defender[i].y,
          rewardObject[randomNumber]
        ); // Pass as arg the random reward object from your array of objects
        items.push(newItem);
        newItem.show = true;
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
      midfielder[i].count--;
      if (midfielder[i].count <= 0) midfielder.splice(i, 1);
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
      midfielder[i].count--;
      if (midfielder[i].count <= 0) attacker.splice(i, 1);
    }
  }
}
