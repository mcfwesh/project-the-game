class Ball {
  constructor() {
    this.x = width / 2; //player.x + player.length / 2;
    this.y = height / 2; //player.y - 10;
    this.r = 20;
    this.speedX = 2;
    this.speedY = 2;
    this.directionX = 1;
    this.directionY = 1;
  }
  display() {
    ellipse(this.x, this.y, this.r * 2);
  }

  move() {
    this.x += this.speedX * this.directionX;
    this.y += this.speedY * this.directionY;
  }
  playerMeet() {
    if (this.x - this.r <= 0 && this.directionX < 0) {
      this.directionX *= -1;
    } else if (this.x + this.r >= width && this.directionX > 0) {
      this.directionX *= -1;
    } else if (this.y - this.r <= 0 && this.directionY < 0) {
      this.directionY *= -1;
    } else if (this.y + this.r >= height && this.directionY > 0) {
      this.directionY *= -1;
    }
  }
}
