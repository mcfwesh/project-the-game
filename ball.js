class Ball {
  constructor() {
    this.x = 0; //player.x + player.length / 2;
    this.y = 200; //player.y - 10;
    this.r = 30;
    this.speedX = 8;
    this.speedY = 8;
    this.directionX = 1;
    this.directionY = 1;
    this.ballImage = loadImage("assets/soccer-ball-transparent.png");
    //this.start = false;
  }
  display() {
    image(this.ballImage, this.x, this.y, ball.r, ball.r);
  }

  move() {
    this.x += this.speedX * this.directionX;
    this.y += this.speedY * this.directionY;
  }
  wallMeet() {
    if (this.x - this.r <= 0 && this.directionX < 0) {
      this.directionX *= -1;
    } else if (this.x + this.r >= width && this.directionX > 0) {
      this.directionX *= -1;
    } else if (this.y - this.r <= 0 && this.directionY < 0) {
      this.directionY *= -1;
    } //else if (this.y + this.r >= height && this.directionY > 0) {
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
}
