class Items {
  constructor(x, y, rewardObject, player, ball) {
    this.length = 50;
    this.breadth = 50;
    this.x = x;
    this.y = y;
    this.speedX = 3;
    this.speedY = 3;
    this.directionX = 1;
    this.directionY = 1;
    this.show = false;
    this.player = player;
    this.ball = ball;
    // You need to make two variables
    // #1 rewardObject.img
    // #2 rewardObject.reward
    this.img = rewardObject.img;
    this.reward = rewardObject.reward;
  }
  display() {
    if (this.show) {
      push();
      fill(0);
      image(this.img, this.x, this.y, this.length, this.breadth); // The image should now be depending on this.img
      pop();
    }
  }
  move() {
    this.y += this.speedY * this.directionY;
  }

  // Create a method execute reward
  // This should have if statements, depending on what the reward is (rewardObject.reward)
  executeReward() {
    if (this.reward === "big player") {
      this.player.length += 5;
    } else if (this.reward === "slow ball") {
      this.ball.speedX -= 0.5;
      this.ball.speedY -= 0.5;
    } else if (this.reward === "quick ball") {
      this.ball.speedX += 0.5;
      this.ball.speedY += 0.5;
    } else if (this.reward === "small player") {
      this.player.length -= 5;
    } else if (this.reward === "small ball") {
      this.ball.length -= 5;
    }
  }
  playerMeet() {
    if (
      this.y < this.player.y &&
      this.y + this.r > this.player.y &&
      this.x + this.r > mouseX &&
      this.x - this.r < mouseX + this.player.length &&
      this.directionY > 0
    ) {
      //this.start = true;
      console.log("meets");
      this.executeReward();
    }
  }
}
