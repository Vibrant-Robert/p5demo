var factor = 0.00094;
var mode1Space;
var Mode = -1;
var customMode = false;
var lineWidth = 1;
var mic;
var isMicOn = false;
var bgm;
var lines1;
var lines2;
var instructions = [];
// var instructionsUsed = [];
var mode1Instr = [];
// var mode1InstrUsed = [];
var mode2Instr = [];
// var mode2InstrUsed = [];
var modeFirstTime = [true, true];
var amp;

function preload() {
  bgm = loadSound('assets/background_music.mp3');
}

function setup() {
  cols = windowWidth;
  rows = windowHeight;
  createCanvas(cols, rows);
  background(30);

  angleMode(DEGREES);
  noiseDetail(1);

  var density = 50;
  mode1Space = width / density;

  lines1 = new Lines(5, factor, 'discrete');
  lines2 = new Lines(2.5, factor, 'constant');

  amp = new p5.Amplitude();

  instructions.push(new Caption('Please Click to Start', 30, [width / 2, height / 2, 600, 200], 0));
  instructions.push(new Caption('What is time?', 30, [width / 2, height / 2, 600, 200], 0));
  instructions.push(new Caption('It flows relentlessly...', 30, [width / 2, height / 2, 600, 200], 0));
  instructions.push(new Caption('...no matter what people try to do', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('This very moment...', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('...are just like these dots.', 30, [width / 2, height / 2, 600, 200], 0));
  

  // instructions.push(new Caption('It vanishes and reappears in next moment', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('But they are all unique', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('Try to drag your mouse across the screen', 30, [width / 2, height / 2, 600, 200],0 ));
  // instructions.push(new Caption('And click your mouse to clear the view', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('And double click to randomize moments of random people', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('But if we tie the moments up...', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('Time has left trails.', 30, [width / 2, height / 2, 600, 200], 0));

  // instructions.push(new Caption('Sometimes your voice can make a difference', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('Try to make some noise to the lines.\n(Press M to turn on/off your microphone)', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('Maybe click your mouse and start over', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('We are unable to stop the time to flow', 30, [width / 2, height / 2, 600, 200], 0));
  // instructions.push(new Caption('But we can change the direction and color of our life', 30, [width / 2, height / 2, 600, 200], 0));
  instructions.push(new Caption('Now...', 30, [width / 2, height / 2, 600, 200], 0));
  instructions.push(new Caption('...enjoy the inner peace of this very moment\nNow you can change the modes by pressing 1 or 2', 30, [width / 2, height / 2, 600, 200],2000));


  // for (var i = 0; i < instructions.length; i++) {
  //   instructionsUsed.push(false);
  // }
  // for (var i = 0; i < mode1Instr.length; i++) {
  //   mode1InstrUsed.push(false);
  // }
  // for (var i = 0; i < mode2Instr.length; i++) {
  //   mode2InstrUsed.push(false);
  // }

}


function draw() {
  fill(255);
  textSize(10);
  text('Drag: create new Items\nClick: clear the view\nDouble click: random\nPress 1: mode1\n Press 2: mode2', 100,height+30,500,300);
  if (Mode === -1) {
    if (!instructions[0].getIsUsed() && !instructions[0].getIsActive()) {
      instructions[0].activate();
    }
    instructions[0].show();
  }



  // if (Mode === 0 || Mode === 1 ||Mode === 2 ) {
  //   for(var i = 1; i < 6;i++){
  //     if (instructions[i-1].getIsUsed() && !instructions[i].getIsActive()) {
  //       instructions[i].activate();
  //     }
  //     instructions[i].show();
  //   }
  //   if(modeFirstTime[0]){
  //     for(var i = 6; i < 13;i++){
  //       if (instructions[i-1].getIsUsed() && !instructions[i].getIsActive()) {
  //         instructions[i].activate();
  //       }
  //       instructions[i].show();
  //     }
  //   }
  //   if(modeFirstTime[1]){
  //     for(var i = 13; i < 20;i++){
  //       if (instructions[i-1].getIsUsed() && !instructions[i].getIsActive()) {
  //         instructions[i].activate();
  //       }
  //       instructions[i].show();
  //     }
  //     if(instructions[12].getIsUsed()){
  //       modeFirstTime[0] = false;
  //     }
  //     if(instructions[instructions.length-1].getIsUsed()){
  //       modeFirstTime[1] = false;
  //     }
  //   }
  // }
  if (Mode === 1) {
    noStroke();
    lines1.show();
    if (!isMicOn) {
      var level = amp.getLevel();

      if (level > 0.2) {
        lines1.setColorOffset(level * 100);
        if (lineWidth < 150)
          lineWidth += level * 10;

      }
      else {
        if (lineWidth > 5)
          lineWidth -= level * 10;
      }
    }

  }
  if (Mode === 2) {

    noStroke();

    lines2.show();
    if (isMicOn) {
      var level = map(mic.getLevel(), 0, 0.7, 0, 0.001);

      if (level > 0.0001) {
        lines2.setFactor(factor + floor(level * 5000) * 0.001);
        lines2.setColorOffset(level * 100000);
      }
      else {
        if (lines2.getFactor > factor)
          lines2.setFactor(lines2.getFactor - 0.0001);
      }
    }

  }

}

function createRandomVector(lines, space) {
  lines.clearPoints();
  for (var i = 0; i < width; i += space) {
    for (var j = 0; j < height; j += space) {
      var p = createVector(i + random(-100, 100), j + random(-100, 100));
      // var p = createVector(random(0,width), j + random(0,height));2
      lines.addPoints(p);
    }
  }
  for (var i = 0; i < width; i += space) {

    var p = createVector(i + random(-100, 100), 0);
    var q = createVector(i + random(-100, 100), height);
    // var p = createVector(random(0,width), j + random(0,height));
    lines.addPoints(p);
    lines.addPoints(q);
  }
  for (var i = 0; i < height; i += space) {

    var p = createVector(0, i + random(-100, 100));
    var q = createVector(width, i + random(-100, 100));
    // var p = createVector(random(0,width), j + random(0,height));
    lines.addPoints(p);
    lines.addPoints(q);
  }
}

function createFixedVector(lines, space, X, Y) {
  lines.clearPoints();
  for (var i = 0; i < width * height; i += space) {
    var p = createVector(X + random(-10, 10), Y + random(-10, 10));
    lines.addPoints(p);
  }
}

function doubleClicked() {
  if (Mode === 1) {
    createRandomVector(lines1, mode1Space);
    lineWidth = 1;
    customMode = false;
  }
  if (Mode === 2) {
    createRandomVector(lines2, mode1Space);
    lineWidth = 1;
    customMode = false;
  }

}

function mouseClicked() {
  if (Mode === -1) {
    background(30);
    mic = new p5.AudioIn();
    bgm.loop();
    instructions[0].setIsUsed();
    Mode = 0;
  }
  if (Mode === 1) {
    if (!customMode) {
      background(30);
      lines1.clearPoints();
    }
    else
      customMode = false;

  }
  if (Mode === 2) {
    if (!customMode) {
      background(30);
      lines2.clearPoints();
    }
    else
      customMode = false;

  }
}

function mouseDragged() {
  if(Mode !== 0)
    customMode = true;
  var p = createVector(mouseX + random(-10, 10), mouseY + random(-10, 10));
  if (Mode === 1) {
    var q = createVector(mouseX + random(-10, 10), mouseY + random(-10, 10));
    lines1.addPoints(p);
    lines1.addPoints(q);
  }
  if (Mode === 2) {
    lines2.addPoints(p);
  }
}

function switchToMode(mode) {
  switch (mode) {
    case 1: background(30);
      createRandomVector(lines1, mode1Space);
      Mode = 1; break;
    case 2: background(30);
      createRandomVector(lines2, mode1Space);
      lineWidth = 1;
      Mode = 2; break;
    default: ;
  }
}
// when you hit the spacebar, what's currently on the canvas will be saved (as
// a "thumbnail.png" file) to your downloads folder. this is a good starting
// point for the final thumbnail of your project (this allows us to make a
// showcase of everyone's work like we did for the nametag assignment).
//
// remember that you need to resize the file to 1280x720, and you will probably
// want to delete this bit for your final submission.
function keyTyped() {
  if (Mode !== -1) {

    if (key === "1") {
      switchToMode(1);
    }
    if (key === "2") {
      switchToMode(2);
    }

    if (key === "m") {
      if (!isMicOn) {
        mic.start();
        isMicOn = true;
      }
      else {
        mic.stop();
        isMicOn = false;
      }
    }

  }
  if (key === " ") {
    saveCanvas("thumbnail.png");
  }

}

class Caption {
  constructor(text, size, position, duraTime) {
    this.text = text;
    this.size = size;
    this.lightness = 30;
    this.position = position;
    this.beginningTime = 0;
    this.duraTime = duraTime;
    this.isActive = false;
    this.isUsed = false;
    textAlign(CENTER, BASELINE);
    rectMode(CENTER);
  }
  activate() {
    this.isActive = true;
    this.isDisappearing = false;
    this.firstShow = true;
  }

  getLightness() {
    return this.lightness;
  }
  getIsActive(){
    return this.isActive;
  }
  getIsUsed(){
    return this.isUsed;
  }
  setIsUsed(){
    this.isUsed = true;
  }


  show() {
    if (!this.isUsed && this.isActive && !this.isDisappearing) {
      if (this.firstShow) {
        const d1 = new Date();
        this.beginningTime = d1.getTime();
        this.firstShow = false;
      }
      noStroke();
      fill(30);
      rect(...this.position);

      fill(this.lightness);
      textSize(this.size);
      text(this.text, ...this.position);
      if (this.lightness <= 255) {
        this.lightness += 2;
      }
      else {
        const d2 = new Date();
        if (d2.getTime() - this.beginningTime >= this.duraTime)
          this.isDisappearing = true;
      }
    }
    else if (this.isActive) {
      this.disappear();
    }
    else {

    }

  }
  disappear() {
    if (this.isActive && this.isDisappearing) {
      noStroke();
      fill(30);
      rect(...this.position);

      fill(this.lightness);
      textSize(this.size);
      text(this.text, ...this.position);
      if (this.lightness > 30) {
        this.lightness -= 2;
      }
      else {
        this.isActive = false;
        this.isUsed = true;
      }
    }

  }
}

class Lines {
  constructor(maxLineWidth, angleFactor, drawMode) {
    this.points = [];
    this.maxLineWidth = maxLineWidth;
    this.angleFactor = angleFactor;
    this.colorOffset = 0.0;
    this.lineWidthIncrease = true;
    this.drawMode = drawMode;
  }

  show() {
    noStroke();
    if (this.drawMode == 'discrete') {
      background(30);
    }
    for (var i = 0; i < this.points.length; i++) {
      var r = map(this.points[i].x, 0, width, 30, 255) + this.colorOffset;
      var g = map(this.points[i].y, 0, height, 50, 255) - this.colorOffset;
      var b = map(this.points[i].y, 0, height, 100, 255) + this.colorOffset;
      var a = map(dist(width / 2, height / 2, this.points[i].x, this.points[i].y), 0, width / 2, width / 2, 0);
      fill(r, g, b);

      var angle = map(noise(this.points[i].x * this.angleFactor, this.points[i].y * this.angleFactor), 0, 1, 0, 1200);

      this.points[i].add(createVector(sin(angle), cos(angle)));
      ellipse(this.points[i].x, this.points[i].y, lineWidth);
    }
    if (this.drawMode == 'constant') {
      if (this.lineWidthIncrease) {
        if (lineWidth < this.maxLineWidth)
          lineWidth += 0.01;
        else {
          this.lineWidthIncrease = false;
        }
      }
      else {
        if (lineWidth >= 1) {
          lineWidth -= 0.01;
        }
        else {
          this.lineWidthIncrease = true;
        }
      }
    }

  }
  setColorOffset(c) {
    this.colorOffset = c;
  }
  setDrawMode(dm) {
    this.drawMode(dm);
  }
  getDrawMode() {
    return this.drawMode;
  }
  setFactor(f) {
    this.angleFactor = f;
  }
  getFactor() {
    return this.angleFactor;
  }
  clearPoints() {
    this.points = [];
  }
  addPoints(point) {
    this.points.push(point);
  }
}
