class Keeper {
  constructor() {
    this.x = width / 2 - 50;
    this.y = 0;
    this.speedX = 2;
    this.directionX = 1;
    this.length = 100;
    this.breadth = 100;
    this.collision = 0;
    this.keeperImage = loadImage("assets/keeper.png");
    this.count = 3;
  }
  display() {
    image(this.keeperImage, this.x, this.y, this.length, this.breadth);
  }
  move() {
    this.x += this.speedX;
  }
  boundaries() {
    if (this.x <= width / 2 - 100 || this.x + this.length >= width / 2 + 100) {
      this.speedX *= -1;
    }
  }
}

// class goalPost extends Keeper{
//     constructor(){

//     }
// }
