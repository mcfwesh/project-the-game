class Goalpost {
  constructor() {
    this.x = width / 2 - 100;
    this.y = 0;
    this.speesdX = 2;
    this.directionX = 1;
    this.length = 250;
    this.breadth = 50;
    this.collision = 0;
    this.goalpostImage = loadImage("assets/goalpost.png");
    this.count = 3;
  }
  display() {
    image(this.goalpostImage, this.x, this.y, this.length, this.breadth);
  }
}
