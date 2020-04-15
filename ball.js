class Ball {
  constructor() {
    this.x = random(0, width); //width / 2 - 100;
    this.y = height - 250;
    this.r = 30;
    this.speedX = 5;
    this.speedY = 5;
    this.directionX = 1;
    this.directionY = 1;
    this.ballImage = loadImage("assets/images/soccer-ball-transparent.png");
    this.start = false;
  }
  display() {
    image(this.ballImage, this.x, this.y, ball.r, ball.r);
  }

  move() {
    if (this.start === true) {
      this.x += this.speedX * this.directionX;
      this.y += this.speedY * this.directionY;
      //console.log(this.x);
    }
  }
  wallMeet() {
    if (this.x - this.r <= 0 && this.directionX < 0) {
      this.directionX *= -1;
    } else if (this.x + this.r >= width && this.directionX > 0) {
      this.directionX *= -1;
    } else if (this.y - this.r <= 0 && this.directionY < 0) {
      this.directionY *= -1;
    } //else if (this.y + this.r >=  height && this.directionY > 0) {
    //   this.directionY *= -1;
    // }
  }
  playerMeet(player) {
    if (
      this.y < player.y &&
      this.y + this.r > player.y &&
      this.x + this.r > player.x &&
      this.x - this.r < player.x + player.length &&
      this.directionY > 0
    ) {
      //this.start = true;
      this.directionY *= -1;
      kickSound.play();
    }
  }
  hitOpponent(opponent) {
    if (
      this.y - this.r < opponent.y + opponent.breadth &&
      this.y + this.r > opponent.y &&
      this.x + this.r > opponent.x &&
      this.x - this.r < opponent.x + opponent.length
    ) {
      return true;
    } else return false;
  }
  scoreGoal() {
    if (
      this.y - this.r < 0 &&
      this.y + this.r > 0 &&
      this.x + this.r > width / 2 - 100 &&
      this.x - this.r < width / 2 - 150
    ) {
      return true;
    } else return false;
  }
}
