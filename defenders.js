class Defender {
  constructor() {
    this.x = 200;
    this.y = 200;
    this.length = 100;
    this.breadth = 50;
  }
  display() {
    rect(this.x, this.y, this.length, this.breadth);
  }
}
