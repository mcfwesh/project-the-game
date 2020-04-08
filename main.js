let mode;
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

let newItem;

let keeperIsNotActive = true;

function preload() {
  pitchImage = loadImage("assets/half-rotate.png");
  // rewardObject[0].img = loadImage(rewardObject[0].img);
  for (let i = 0; i < rewardObject.length; i++) {
    rewardObject[i].img = loadImage(rewardObject[i].img);
  }
}
function setup() {
  mode = 0;
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("canvas");
  background(100);
  player = new Player();
  ball = new Ball();

  // for (let j = 0; j < defenderRows; j++) {
  //   defender.push(new Defender(350 + 200 * j));
  // }
  // for (let j = 0; j < midfielderRows; j++) {
  //   midfielder.push(new Midfielder(425 + 300 * j));
  // }
  for (let j = 0; j < attackerRows; j++) {
    attacker.push(new Attacker(455 + 300 * j));
    // let randomNumber = Math.floor(Math.random() * rewardObject.length);
    // newItem = new Items(
    //   attacker[j].x,
    //   attacker[j].y,
    //   rewardObject[randomNumber]
    // );
  }
  goalpost = new Goalpost();
  keeper = new Keeper();
}

// let startScreen = false; // change to true

//START of DRAW()
function draw() {
  //if(level === 0) {
  //  image() start
  //} else if (level < 0) {
  // image() game over
  // } else {
  clear();
  if (mode === 0) {
    // Your code for displaying the start screeen
    background(150);
    textSize(21); // Button: Start => click => startScreen = false
    text("Press enter to start", 20, 40);
  }
  if (mode === 1) {
    image(pitchImage, 0, 0, width, height);
    stroke(3);
    strokeWeight(3);
    player.display();
    player.checkMove();
    ball.display();
    // goalpost.display();
    // keeper.display();
    // keeper.move();
    // keeper.boundaries();

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
        // Get a random number that is from 0 and to the length -1 of the array of objects
        let randomNumber = Math.floor(Math.random() * rewardObject.length);
        let newItem = new Items(defender[i].x, defender[i].y, rewardObject[2]); // Pass as arg the random reward object from your array of objects
        items.push(newItem);
        newItem.show = true;
        newItem.playerMeet(player);
        defender[i].count--;
        if (defender[i].count <= 0) {
          defender.splice(i, 1);
          console.log(newItem.playerMeet(player));
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
          rewardObject[2]
        ); // Pass as arg the random reward object from your array of objects
        items.push(newItem);
        newItem.show = true;
        newItem.playerMeet(player);
        midfielder[i].count--;
        if (midfielder[i].count <= 0) {
          midfielder.splice(i, 1);
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
        newItem = new Items(attacker[i].x, attacker[i].y, rewardObject[2]); // Pass as arg the random reward object from your array of objects
        attacker[i].count--;
        items.push(newItem);
        newItem.display();
        newItem.move();
        newItem.show = true;
        if (attacker[i].count <= 0) {
          attacker.splice(i, 1);
        }
      }
    }
    if (ball.y > height) {
      player.life--;
      ball.x = 0;
      ball.y = 200;
      // if (player.life === 0) {
      //   mode = 0;
      //   player.life = 5;
      // }
    }

    if (
      defender.length === 0 &&
      midfielder.length === 0 &&
      attacker.length === 0
    ) {
      goalpost.display();
      keeper.display();
      keeper.move();
      keeper.boundaries();
      goalpost.display();
      if (ball.hitOpponent(goalpost)) console.log("GOAL");
      if (ball.hitOpponent(keeper)) {
        ball.directionY *= -1;
        ball.directionX *= -1;
        console.log("HIT");
      }

      //   ball.x = width / 2;
      //   ball.y = height / 2;
      //   ball.move();
      //   ball.playerMeet(player);
    }

    if (
      defender.length === 0 &&
      attacker.length === 0 &&
      midfielder.length === 0 &&
      keeperIsNotActive
    ) {
      ball.speedX = 4;
      ball.x = width / 2;
      ball.y = height / 2;
      keeperIsNotActive = false;
    }
  }
  for (item of items) {
    item.playerMeet(player);
  }
}

//END of DRAW()

function keyPressed() {
  if (keyCode === 37) {
    player.moveLeft = true;
  } else if (keyCode === 39) {
    player.moveRight = true;
  }
  if (keyCode === ENTER) {
    mode = 1;
    reset();
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

function keyReleased() {
  player.moveLeft = false;
  player.moveRight = false;
}
