class Defender {
  constructor(x) {
    this.x = x;
    this.y = 50;
    this.length = 120;
    this.breadth = 150;
    this.collision = 0;
    this.defenderImage = loadImage("assets/defender.png");
    this.count = 2;
  }
  display() {
    image(this.defenderImage, this.x, this.y, this.length, this.breadth);
  }
  move() {
    if (this.collision != 0) {
      this.x += this.collision;
      this.collision = 0;
    } else {
      this.x += random(-1, 1);
    }

    if (this.x < 400) {
      this.x += 2;
    } else if (this.x > width - 400) {
      this.x -= 2;
    }
  }
  collissions(other) {
    if (this.x + this.length > other.x && this.x < other.x + other.length) {
      if (this.x + this.length > other.x + other.length) {
        this.collision = 3;
      } else {
        console.log("Markus");
        this.collision = -3;
      }
    }
  }
}
