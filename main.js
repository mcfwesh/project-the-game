let clockFont;
let timerID = document.getElementById("timer");
let mode;
let timer = 60;
let player;
let ball;
let defender = [];
let midfielder = [];
let attacker = [];
let keeper;
let goalpost;
let numberofDefenders = 20;
let defenderRows = 5;
let midfielderRows = 5;
let attackerRows = 5;
let items = [];
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
let cursiveFont;
let highscoreSet = true;

var highscore = window.localStorage.getItem("highscore");
function preload() {
  pitchImage = loadImage("assets/half-rotate.png");
  menuImage = loadImage("assets/menu.png");
  winImage = loadImage("assets/winscreen.png");
  gameoverImage = loadImage("assets/gameover.png");
  kickSound = loadSound("assets/kick.wav");
  crowdSound = loadSound("assets/sample.mp3");
  backgroundSound = loadSound("assets/background.mp3");
  gameoverSound = loadSound("assets/goal.mp3");
  hitSound = loadSound("assets/hit.mp3");
  itemSound = loadSound("assets/items.wav");
  goalSound = loadSound("assets/goal.mp3");
  clockFont = loadFont("assets/digital-7 (mono italic).ttf");
  cursiveFont = loadFont("assets/cursive.otf");

  for (let i = 0; i < rewardObject.length; i++) {
    rewardObject[i].img = loadImage(rewardObject[i].img);
  }
}
function setup() {
  mode = 0;
  backgroundSound.playMode("restart");
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
    attacker.push(new Attacker(225 + 300 * j));
  }
  goalpost = new Goalpost();
  keeper = new Keeper();
  noLoop();
}

//START of DRAW()
function draw() {
  clear();
  if (mode === 0) {
    backgroundSound.play();

    background(menuImage);
    textAlign(CENTER, TOP);
    textSize(100);
    fill(255);
    textFont(cursiveFont);
    text("HEADBREAK", 550, 200);
    textSize(50);
    text("PRESS ENTER TO BEGIN", 550, 400);
    return;
  } else if (mode === 1) {
    backgroundSound.stop();
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
          hitSound.play();
        }
      }
    }
    for (let i = 0; i < midfielder.length; i++) {
      midfielder[i].display();
      midfielder[i].move();
      for (let mid of midfielder) {
        if (midfielder[i].x != mid.x) {
          if (frameCount % 10 === 0) midfielder[i].collissions(mid);
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
          hitSound.play();
        }
      }
    }
    for (let i = 0; i < attacker.length; i++) {
      attacker[i].display();
      attacker[i].move();

      // optional
      attacker.forEach((a) => {
        if (attacker[i].x != a.x) {
          if (frameCount % 10 === 0) attacker[i].collissions(a);
        }
      });

      /* for (let att of attacker) {
        if (attacker[i].x != att.x) {
          if (frameCount % 10 === 0) attacker[i].collissions(att);
        }
      } */
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
          hitSound.play();
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
    for (item of items) {
      item.playerMeet(player);
    }
    textFont(clockFont);
    fill(255);
    textSize(30);
    text(`TIMER: 0:${timer}`, 100, 20);
    text(`LIVES:${player.life}`, 1000, 20);
    text(`SCORE: 0${player.score}`, 300, 20);
    text(`HI-SCORE: 0${highscore}`, 800, 20);
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
