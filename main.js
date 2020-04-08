let player;
let ball;
let defender = [];
let midfielder = [];
let attacker = [];
let keeper;
let goalpost;
let numberofDefenders = 20;
let defenderRows = 4;
let midfielderRows = 3;
let attackerRows = 3;
let items = [];
let pitchImage;
let bootImage = "assets/boot.png";
let waterImage = "assets/water.png";
let redcardImage = "assets/red-card.png";
let yellowcardImage = "assets/yellow-card.png";
let medalImage = "assets/medal.png";
let rewardObject = [
  { img: bootImage, reward: "small ball" },
  { img: waterImage, reward: "slow ball" },
  { img: redcardImage, reward: "small player" },
  { img: yellowcardImage, reward: "quick ball" },
  { img: medalImage, reward: "big player" },
];

let gamePlay = false;
let youWin = false;

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
  keeper = new Keeper();
  goalpost = new Goalpost();
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
  if (gamePlay) player.checkMove();
  ball.display();
  goalpost.display();
  keeper.display();
  keeper.move();
  keeper.boundaries();

  if (gamePlay) ball.move();
  if (gamePlay) ball.wallMeet();
  if (gamePlay) ball.playerMeet(player);
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
      // Get a random number that is from 0 and to the length -1 of the array of objects
      let randomNumber = Math.floor(Math.random() * rewardObject.length);
      let newItem = new Items(
        defender[i].x,
        defender[i].y,
        rewardObject[randomNumber],
        player,
        ball
      ); // Pass as arg the random reward object from your array of objects
      items.push(newItem);
      newItem.show = true;
      newItem.playerMeet();
      defender[i].count--;
      if (defender[i].count <= 0) {
        defender.splice(i, 1);
        console.log(newItem.playerMeet());
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
      // Get a random number that is from 0 and to the length -1 of the array of objects
      let randomNumber = Math.floor(Math.random() * rewardObject.length);
      let newItem = new Items(
        midfielder[i].x,
        midfielder[i].y,
        rewardObject[randomNumber],
        player,
        ball
      ); // Pass as arg the random reward object from your array of objects
      items.push(newItem);
      newItem.show = true;
      newItem.playerMeet();
      midfielder[i].count--;
      if (midfielder[i].count <= 0) {
        midfielder.splice(i, 1);
        console.log(newItem.playerMeet());
      }
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
      // Get a random number that is from 0 and to the length -1 of the array of objects
      let randomNumber = Math.floor(Math.random() * rewardObject.length);
      let newItem = new Items(
        attacker[i].x,
        attacker[i].y,
        rewardObject[randomNumber],
        player,
        ball
      ); // Pass as arg the random reward object from your array of objects
      items.push(newItem);
      newItem.show = true;
      newItem.playerMeet();
      attacker[i].count--;
      if (attacker[i].count <= 0) {
        attacker.splice(i, 1);
        console.log(newItem.playerMeet());
      }
    }
  }

  if (
    defender.length === 0 &&
    midfielder.length === 0 &&
    attacker.length === 0
  ) {
    keeper.display();
  }

  if (ball.y > height) {
    gamePlay = false;
    ball.x = 0;
    ball.y = 200;
  }

  if (
    defender.length === 0 &&
    attacker.length === 0 &&
    midfielder.length === 0
  ) {
    youWin = true;
    gamePlay = false;
  }
}
function keyPressed() {
  //Start the game
  if (keyCode === 32) {
    gamePlay = true;
    youWin = false;
    if (
      defender.length === 0 &&
      attacker.length === 0 &&
      midfielder.length === 0
    ) {
      for (let j = 0; j < defenderRows; j++) {
        defender.push(new Defender(350 + 200 * j));
      }
      for (let j = 0; j < midfielderRows; j++) {
        midfielder.push(new Midfielder(425 + 300 * j));
      }
      for (let j = 0; j < attackerRows; j++) {
        attacker.push(new Attacker(455 + 300 * j));
      }
    }
  }
}
