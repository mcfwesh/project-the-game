class Goalpost {
  constructor() {
    this.x = width / 2 - 100;
    this.y = 0;
    this.speedX = 2;
    this.directionX = 1;
    this.length = 200;
    this.breadth = 50;
    this.collision = 0;
    this.goalpostImage = loadImage("assets/goalpost.png");
    this.count = 3;
  }
  display() {
    image(this.goalpostImage, this.x, this.y, this.length, this.breadth);
  }
}
