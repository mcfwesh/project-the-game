let clockFont;
// let instructions = document.getElementById("instructions").innerText;
let testing = document.querySelector(".testing");
let timerID = document.getElementById("timer");
let mode;
let timer = 60;
let player;
let ball;
const defender = [];
const midfielder = [];
const attacker = [];
let keeper;
let goalpost;
let numberofDefenders = 20;
const defenderRows = 5;
const midfielderRows = 5;
const attackerRows = 5;
const items = [];
let pitchImage;
let menuImage;
let winImage;
let gameoverImage;
let kickSound;
let crowdSound;
let backgroundSound;
let gameoverSound;
let hitSound;
let itemSound;
let goalSound;
let bootImage = "assets/images/boot.png";
let waterImage = "assets/images/water.png";
let redcardImage = "assets/images/red-card.png";
let yellowcardImage = "assets/images/yellow-card.png";
let medalImage = "assets/images/medal.png";
let rewardObject = [
  { img: bootImage, reward: "small ball" },
  { img: waterImage, reward: "slow ball" },
  { img: redcardImage, reward: "small player" },
  { img: yellowcardImage, reward: "quick ball" },
  { img: medalImage, reward: "big player" },
];
let newItem;
let keeperIsNotActive = true;
let cursiveFont;
let highscoreSet = true;

let highscore = window.localStorage.getItem("highscore");
function preload() {
  // background images
  pitchImage = loadImage("assets/backgrounds/half-rotate.png");
  menuImage = loadImage("assets/backgrounds/menu.png");
  winImage = loadImage("assets/backgrounds/winscreen.png");
  gameoverImage = loadImage("assets/backgrounds/gameover.png");

  // sounds
  kickSound = loadSound("assets/sounds/kick.wav");
  crowdSound = loadSound("assets/sounds/sample.mp3");
  backgroundSound = loadSound("assets/sounds/background.mp3");
  gameoverSound = loadSound("assets/sounds/goal.mp3");
  hitSound = loadSound("assets/sounds/hit.mp3");
  itemSound = loadSound("assets/sounds/items.wav");
  goalSound = loadSound("assets/sounds/goal.mp3");

  // fonts
  clockFont = loadFont("assets/fonts/digital-7 (mono italic).ttf");
  cursiveFont = loadFont("assets/fonts/cursive.otf");

  /* for (let i = 0; i < rewardObject.length; i++) {
    rewardObject[i].img = loadImage(rewardObject[i].img);
  } */
  // forEach is fastest loop
  rewardObject.forEach((r) => {
    r.img = loadImage(r.img);
  });
}
function setup() {
  mode = 0;
  backgroundSound.playMode("restart");
  let canvas = createCanvas(1100, 780);
  canvas.parent("canvas");
  player = new Player();
  ball = new Ball();

  // defender
  /* for (let j = 0; j < defenderRows; j++) {
    defender.push(new RivalPlayer(150 + 200 * j, 20, "defender", 3));
  } */
  for (let j = 0; j < midfielderRows; j++) {
    defender.push(new RivalPlayer(150 + 200 * j, 20, "defender", 3));
    midfielder.push(new RivalPlayer(150 + 200 * j, 180, "midfielder", 2));
    attacker.push(new RivalPlayer(150 + 200 * j, 330, "attacker", 2));
  }
  /* for (let j = 0; j < attackerRows; j++) {
    attacker.push(new RivalPlayer(150 + 200 * j, 330, "attacker", 2));
  } */
  goalpost = new Goalpost();
  keeper = new Keeper();
  noLoop();
}

//START of DRAW()
function draw() {
  clear();
  if (mode === 0) {
    backgroundSound.play();
    drawMenuText();
    return;
  }

  if (mode === 1) {
    backgroundSound.stop();
    image(pitchImage, 0, 0, width, height);
    stroke(3);
    strokeWeight(3);
    textSize(20);
    player.display();
    player.checkMove();
    ball.display();

    ball.move();
    ball.wallMeet();

    ball.playerMeet(player);
    if (items.length > 0) {
      items.forEach((item) => {
        item.display();
        item.move();
      });
    }

    defender.forEach((d, i) => {
      handleRivalPlayerMovement(d, defender, i);
      handleBallHitRivals(d, ball, player, i, defender);
    });

    midfielder.forEach((m, i) => {
      handleRivalPlayerMovement(m, midfielder, i);
      handleBallHitRivals(m, ball, player, i, midfielder);
    });

    attacker.forEach((a, i) => {
      handleRivalPlayerMovement(a, attacker, i);
      handleBallHitRivals(a, ball, player, i, attacker);
    });

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
      ball.start = true;
      // ball.speedY = 10;
      // ball.speedX = 5;
      if (ball.hitOpponent(goalpost)) {
        goalSound.play();
        player.score += 20;
        mode = 3;
      }
      if (ball.hitOpponent(keeper)) {
        ball.directionY *= -1;
        ball.directionX *= -1;
        hitSound.play();
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
    for (let item of items) {
      item.playerMeet(player);
    }
    textFont(clockFont);
    fill(255);
    textSize(30);
    text(`TIMER: 0:${timer}`, 100, 20);
    text(`LIVES:${player.life}`, 1000, 20);
    text(`SCORE: 0${player.score}`, 300, 20);
    text(`HI-SCORE:${highscore}`, 800, 20);
  }
  //Finished sketch
  if (mode === 2) {
    if (highscoreSet) {
      window.localStorage.setItem("highscore", 0);
      if (highscore !== 0) {
        if (player.score > highscore) {
          window.localStorage.setItem("highscore", player.score);
        }
      } else {
        window.localStorage.setItem("highscore", player.score);
      }
      highscoreSet = false;
    }
    background(gameoverImage);
    crowdSound.stop();
    backgroundSound.stop();
    textAlign(CENTER, TOP);
    textSize(100);
    fill(255);
    text("GAME OVER", 550, 200);
    textSize(30);
    text(`FINAL SCORE:${player.score}`, 550, 300);
    textSize(50);
    text("PRESS SPACEBAR TO CONTINUE", 550, 600);
  }
  if (mode === 3) {
    if (highscoreSet) {
      window.localStorage.setItem("highscore", 0);
      if (highscore !== 0) {
        if (player.score > highscore) {
          window.localStorage.setItem("highscore", player.score);
        }
      } else {
        window.localStorage.setItem("highscore", player.score);
      }
      highscoreSet = false;
    }
    background(winImage);
    crowdSound.stop();
    textAlign(CENTER, TOP);
    textSize(100);
    fill(255);
    text("GOOD JOB!", 550, 200);
    textSize(50);
    text("PRESS SPACEBAR TO CONTINUE", 550, 600);
    textSize(30);
    text(`FINAL SCORE:${player.score}`, 550, 300);
  }
  if (ball.y > height) {
    ball.x = 0;
    ball.y = 300;
    ball.start = false;
    player.life--;
    if (player.life === 0) {
      mode = 2;
      player.life = 5;
    }
  }

  //Timer
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;

    if (timer === 0) {
      mode = 2;
    }
  }
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

    // if (
    //   defender.length === 0 &&
    //   attacker.length === 0 &&
    //   midfielder.length === 0
    // ) {
    //   for (let j = 0; j < defenderRows; j++) {
    //     defender.push(new Defender(350 + 200 * j));
    //   }
    //   for (let j = 0; j < midfielderRows; j++) {
    //     midfielder.push(new Midfielder(425 + 300 * j));
    //   }
    //   for (let j = 0; j < attackerRows; j++) {
    //     attacker.push(new Attacker(455 + 300 * j));
    //   }
    // }
  }
  if (keyCode === 32 && (mode === 2 || 3)) {
    window.location.reload();
  }
  if (keyCode === 40 && mode === 1) {
    ball.start = true;
  }
}

function keyReleased() {
  player.moveLeft = false;
  player.moveRight = false;
}
function playMusic() {
  if (mode === 1) crowdSound.play();
}

function drawMenuText() {
  background(menuImage);
  textAlign(CENTER, TOP);
  textSize(100);
  fill(255);
  textFont(cursiveFont);
  text("HEADBREAK", 550, 50);
  textSize(50);
  text("PRESS ENTER TO BEGIN", 550, 700);
  textSize(25);
  fill("gold");
  text("Start the ball with the down arrow on the keyboard", 500, 300);
  text("Any of these items can improve or decrease your experience:", 500, 450);
  text("Boots, Yellow Cards, Red cards, Medal and water bottle", 500, 480);
  text("YOU ONLY HAVE 60 secs and 5 lives", 500, 350);
}

function handleRivalPlayerMovement(rival, rivalArray, index) {
  rival.display();
  rival.move();
  for (let riv of rivalArray) {
    if (rivalArray[index].x !== riv.x) {
      rival.collissions(riv);
    }
  }
}

function handleBallHitRivals(rival, ball, player, i, rivalArray) {
  if (ball.hitOpponent(rival)) {
    ball.directionY *= -1;
    ball.directionX *= -1;
    player.score += 2;
    // Get a random number that is from 0 and to the length -1 of the array of objects
    let randomNumber = Math.floor(Math.random() * rewardObject.length);
    console.log("randomNumber is -->", randomNumber);
    let newItem = new Items(rival.x, rival.y, rewardObject[randomNumber]); // Pass as arg the random reward object from your array of objects
    items.push(newItem);
    newItem.show = true;
    newItem.playerMeet(player);
    rival.count--;
    if (rival.count <= 0) {
      rivalArray.splice(i, 1);
      hitSound.play();
    }
  }
}
