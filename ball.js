class Ball {
  constructor() {
    this.x = 400; //player.x + player.length / 2;
    this.y = 0; //player.y - 10;
    this.r = 30;
    this.speedX = 5;
    this.speedY = 5;
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
      this.x + this.r > mouseX &&
      this.x - this.r < mouseX + player.length &&
      this.directionY > 0
    ) {
      //this.start = true;
      this.directionY *= -1;
    }
    console.log("meee");
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
