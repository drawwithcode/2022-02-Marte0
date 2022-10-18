let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0, 35);
  if (frameCount % 3 == 0) {
    let fireworkX = random(0 + 100, windowWidth - 100);
    let fireworkY = random(0 + 100, windowHeight - 100);
    let fireworkColor = color(
      random(80, 255),
      random(80, 255),
      random(80, 255)
    );

    for (let i = 0; i < random(100, 1000); i++) {
      let p = new Particle(fireworkX, fireworkY, fireworkColor);
      particles.push(p);
    }
  }
  particles.forEach(function (p, index) {
    p.update();
    p.show();

    if (alpha(p.color) <= 0) particles.splice(index, 1);
  });
}

class Particle {
  constructor(x, y, color) {
    this.x = x; //= windowWidth / 2;
    this.y = y; //= windowHeight / 2;
    this.vx = random(-3, +3);
    this.vy = random(-3, +3);
    this.alpha = 255;
    this.color = color;
    this.fade = random(3, 4);
  }

  show() {
    strokeWeight(3);
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
