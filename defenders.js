class Defender {
  constructor(x) {
    this.x = x;
    this.y = 50;
    this.length = 120;
    this.breadth = 150;
    this.collision = 0;
    this.defenderImage = loadImage("assets/defender2.png");
    this.count = 1;
    this.direction = 1;
  }
  display() {
    image(this.defenderImage, this.x, this.y, this.length, this.breadth);
  }
  move() {
    if (this.collision != 0) {
      this.x += this.collision;
      this.collision = 0;
    } else {
      this.x += 2 * this.direction;
      // this.x += random(-1, 1);
    }

    if (this.x < 200) {
      this.x += 2;
      this.direction = 1;
    } else if (this.x > width - 200) {
      this.x -= 2;
      this.direction = -1;
    }
  }
  collissions(other) {
    if (this.x + this.length > other.x && this.x < other.x + other.length) {
      if (this.x + this.length > other.x + other.length) {
        this.direction = 1;
      } else {
        this.direction = -1;
      }
    }
  }
}
