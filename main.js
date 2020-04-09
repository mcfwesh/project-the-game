let clockFont;
let timerID = document.getElementById("timer");
console.log(timerID);
let mode;
let timer = 30;
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
let menuImage;
let winImage;
let gameoverImage;
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
  menuImage = loadImage("assets/menu.png");
  winImage = loadImage("assets/winscreen.png");
  gameoverImage = loadImage("assets/gameover.png");
  for (let i = 0; i < rewardObject.length; i++) {
    rewardObject[i].img = loadImage(rewardObject[i].img);
  }

  clockFont = loadFont("assets/digital-7 (mono italic).ttf");
}
function setup() {
  mode = 0;
  let canvas = createCanvas(1100, 780);
  canvas.parent("canvas");
  player = new Player();
  ball = new Ball();

  for (let j = 0; j < defenderRows; j++) {
    defender.push(new Defender(150 + 200 * j));
  }
  for (let j = 0; j < midfielderRows; j++) {
    midfielder.push(new Midfielder(225 + 300 * j));
  }
  for (let j = 0; j < attackerRows; j++) {
    attacker.push(new Attacker(255 + 300 * j));
    // let randomNumber = Math.floor(Math.random() * rewardObject.length);
    // newItem = new Items(
    //   attacker[j].x,
    //   attacker[j].y,
    //   rewardObject[randomNumber]
    // );
  }
  goalpost = new Goalpost();
  keeper = new Keeper();
  noLoop();
}

// let startScreen = false; // change to true

//START of DRAW()
function draw() {
  //frameRate(1);
  //if(level === 0) {
  //  image() start
  //} else if (level < 0) {
  // image() game over
  // } else {
  clear();
  if (mode === 0) {
    // Your code for displaying the start screeen
    background(menuImage);
    textAlign(CENTER, TOP);
    textSize(100);
    fill(255);
    text("FOOTBREAK", 550, 200);
    return;
  }
  if (mode === 1) {
    image(pitchImage, 0, 0, width, height);
    stroke(3);
    strokeWeight(3);
    textSize(20);
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
        let newItem = new Items(
          defender[i].x,
          defender[i].y,
          rewardObject[randomNumber]
        ); // Pass as arg the random reward object from your array of objects
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
          rewardObject[randomNumber]
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
        newItem = new Items(
          attacker[i].x,
          attacker[i].y,
          rewardObject[randomNumber]
        ); // Pass as arg the random reward object from your array of objects
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
      if (ball.scoreGoal()) {
        mode = 3;
      }
      if (ball.hitOpponent(keeper)) {
        ball.directionY *= -1;
        ball.directionX *= -1;
        console.log("HIT");
      }

      //   ball.x =  width / 2;
      //   ball.y =  height / 2;
      //   ball.move();
      //   ball.playerMeet(player);
    }

    if (
      defender.length === 0 &&
      attacker.length === 0 &&
      midfielder.length === 0 &&
      keeperIsNotActive
    ) {
      keeperIsNotActive = false;
      ball.speedX = 1;
      ball.x = width / 2;
      ball.y = height / 2;
    }
    for (item of items) {
      item.playerMeet(player);
    }
  }
  //Finished sketch
  if (ball.y > height) {
    ball.x = width / 2 - 100; //player.x + player.length / 2;
    ball.y = height - 250;
    player.life--;
    setInterval(ball.move, 10000);
    if (player.life === 0) {
      mode = 2;
      player.life = 5;
    }
  }

  //Timer
  if (frameCount % 60 === 0 && timer > 0) {
    console.log(timer--);

    if (timer === 0) {
      mode = 2;
    }
  }

  if (mode === 2) {
    background(gameoverImage);
    textSize(21); // Button: Start => click => startScreen = false
    text("Game Over", 20, 40);
  }
  if (mode === 3) {
    background(winImage);
    textSize(21); // Button: Start => click => startScreen = false
    text("NICE JOB", 20, 40);
  }
  textFont(clockFont);
  fill(255);
  text(timer, 0, 30);
}

//END of DRAW()

function keyPressed() {
  if (keyCode === 37) {
    player.moveLeft = true;
  } else if (keyCode === 39) {
    player.moveRight = true;
  }
  if (keyCode === ENTER && mode === 0) {
    mode = 1;
    loop();
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
  if (keyCode === 32 && (mode === 2 || 3)) {
    window.location.reload();
  }
}

function keyReleased() {
  player.moveLeft = false;
  player.moveRight = false;
}
