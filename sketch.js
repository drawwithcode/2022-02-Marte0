let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0); // this prevent a the fade in of the canvas
}

function windowResized() {
  //when the window is resized the canvas is resized as well
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

function draw() {
  background(0, 20);
  if (frameCount % 10 == 0) {
    //every 10 frame a new firework appears
    let fireworkX = random(0 + 100, windowWidth - 100);
    let fireworkY = random(0 + 100, windowHeight - 100);

    createFirework(fireworkX, fireworkY);
    createFirework(fireworkX, fireworkY);
  }
  particles.forEach(function (p, index) {
    //update each particle and check if it's still visible
    p.update();
    p.show();

    if (alpha(p.color) <= 0) particles.splice(index, 1); //delete the faded particles
  });
}

class Particle {
  // all the particle stuff
  constructor(x, y, color, increase) {
    //increase is equal to 2 if the firework is created by clicking
    this.x = x; //= windowWidth / 2;
    this.y = y; //= windowHeight / 2;
    this.vx = random(-3, +3) * increase;
    this.vy = random(-3, +3) * increase; // vy and vy are how much the particle is shifted each update on the axes
    this.alpha = 255;
    this.color = color;
    this.fade = random(2, 4) / increase;
    this.weight = random(1, 5) * increase;
  }

  show() {
    //draw the particle
    strokeWeight(this.weight);
    this.color.setAlpha(this.alpha);
    stroke(this.color);

    point(this.x, this.y);

    //fill(255, this.alpha);
    //ellipse(this.x, this.y, 3);
  }

  update() {
    // update the particle
    this.x += this.vx;
    this.vy += 0.07; // simulate gravity
    if (this.vx > 0) this.vx -= 0.03; //simulate gravity

    if (this.vx < 0) this.vx += 0.03; //simulate gravity

    this.y += this.vy;
    this.alpha -= this.fade; //make the particles fade
  }
}

function createFirework(fireworkX, fireworkY, increase = 1) {
  //create the firework creating a variable amount of particles
  let fireworkColor = color(random(80, 255), random(80, 255), random(80, 255));

  for (let i = 0; i < random(100, 1000); i++) {
    let p = new Particle(fireworkX, fireworkY, fireworkColor, increase);
    particles.push(p);
  }
}

function mouseClicked() {
  //on mouse click a bigger firework is created
  console.log("click");
  createFirework(mouseX, mouseY, 2); // 3 function for a 3 colors firework
  createFirework(mouseX, mouseY, 2);
  createFirework(mouseX, mouseY, 2);
}
