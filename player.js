class Player {
  constructor() {
    this.length = 150;
    this.breadth = 30;
    this.x = (width - this.length) / 2;
    this.y = height - 120;
    this.playerImage = loadImage("assets/player.png");
    this.health = 3;
    this.moveRight = false;
    this.moveLeft = false;
    this.life = 1;
    //console.log(this.life);
  }
  display() {
    rect(this.x, this.y, this.length, this.breadth);
    image(
      this.playerImage,
      this.x + this.length / 2 - 50,
      height - 90,
      100,
      100
    );
  }
  move(speed) {
    this.x += speed;
  }
  checkMove() {
    if (this.moveLeft) {
      this.move(-10);
    } else if (this.moveRight) {
      this.move(10);
    }
    if (this.x <= 0) {
      this.x = 0;
    } else if (this.x + this.length >= width) {
      this.x = width - this.length;
    }
  }
}
// this.x
// lefts= this.x or player.x
// right= this.x+this. width
// top=thix.y
// bottom= this.y +this. height
// let xCollison=ball.leftside>playerleft && ball.leftside<playerright
