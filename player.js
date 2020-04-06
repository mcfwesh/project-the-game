class Player {
  constructor() {
    this.length = 100;
    this.breadth = 30;
    this.x = (width - this.length) / 2;
    this.y = height - 50;
  }
  display() {
    rect(mouseX, this.y, this.length, this.breadth);
  }
  checkMove() {
    if (mouseX <= 0) {
      mouseX = 0;
    } else if (mouseX + this.length >= width) {
      mouseX = width - this.length;
    }
  }
}
