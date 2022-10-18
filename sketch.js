let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function mouseClicked() {
  console.log("click");
  createFirework(mouseX, mouseY, 2);
  createFirework(mouseX, mouseY, 2);
  createFirework(mouseX, mouseY, 2);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0, 20);
  if (frameCount % 10 == 0) {
    let fireworkX = random(0 + 100, windowWidth - 100);
    let fireworkY = random(0 + 100, windowHeight - 100);

    createFirework(fireworkX, fireworkY);
    createFirework(fireworkX, fireworkY);
  }
  particles.forEach(function (p, index) {
    p.update();
    p.show();

    if (alpha(p.color) <= 0) particles.splice(index, 1);
  });
}

class Particle {
  constructor(x, y, color, increase) {
    this.x = x; //= windowWidth / 2;
    this.y = y; //= windowHeight / 2;
    this.vx = random(-3, +3) * increase;
    this.vy = random(-3, +3) * increase;
    this.alpha = 255;
    this.color = color;
    this.fade = random(2, 4) / increase;
    this.weight = random(1, 5) * increase;
  }

  show() {
    strokeWeight(this.weight);
    this.color.setAlpha(this.alpha);
    stroke(this.color);

    point(this.x, this.y);

    //fill(255, this.alpha);
    //ellipse(this.x, this.y, 3);
  }

  update() {
    this.x += this.vx;
    this.vy += 0.07;
    if (this.vx > 0) this.vx -= 0.03;

    if (this.vx < 0) this.vx += 0.03;

    this.y += this.vy;
    this.alpha -= this.fade;
  }
}

function createFirework(fireworkX, fireworkY, increase = 1) {
  let fireworkColor = color(random(80, 255), random(80, 255), random(80, 255));

  for (let i = 0; i < random(100, 1000); i++) {
    let p = new Particle(fireworkX, fireworkY, fireworkColor, increase);
    particles.push(p);
  }
}
