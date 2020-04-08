class Items {
  constructor(x, y, rewardObject) {
    this.length = 50;
    this.breadth = 50;
    this.x = x;
    this.y = y;
    this.speedX = 3;
    this.speedY = 3;
    this.directionX = 1;
    this.directionY = 1;
    this.show = false;
    // this.player = player;
    // this.ball = ball;
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
  executeReward(player, ball) {
    if (this.reward === "big player") {
      let index = items.indexOf(this);
      console.log(index);
      items.splice(index, 1);
      player.length += 1;
      // console.log("bigplayer");
    } else if (this.reward === "slow ball") {
      let index = items.indexOf(this);
      console.log(index);
      items.splice(index, 1);
      ball.speedX -= 1;
      ball.speedY -= 1;
      // console.log("slowball");
    } else if (this.reward === "quick ball") {
      let index = items.indexOf(this);
      console.log(index);
      items.splice(index, 1);
      ball.speedX += 0.5;
      ball.speedY += 0.5;
      // console.log("quickball");
    } else if (this.reward === "small player") {
      let index = items.indexOf(this);
      console.log(index);
      items.splice(index, 1);
      player.length > 30 ? (player.length -= 5) : (ball.r = 30);

      // console.log("small player");
    } else if (this.reward === "small ball") {
      let index = items.indexOf(this);
      console.log(index);
      items.splice(index, 1);
      ball.r > 10 ? (ball.r -= 1) : (ball.r = 10);

      console.log("smallball");
    }
  }
  playerMeet(player) {
    if (
      this.y < player.y + player.breadth &&
      this.y + this.breadth > player.y &&
      this.x + this.length > this.x &&
      this.x < this.x + player.length
    ) {
      this.executeReward(player, ball);
    }
  }
}
