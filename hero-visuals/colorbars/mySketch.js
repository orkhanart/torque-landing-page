p5.disableFriendlyErrors = true;

const title = 'geometry';
let palette = [];
let motif;
let backgroundColor = '#f5f5f5';

function setup() {
  createCanvas(1000, 1000);
  strokeCap(SQUARE);
  angleMode(RADIANS);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);
  pixelDensity(1);
  noSmooth();
	frameRate(30);
  init()
}

function init() {
  const orgPalette = getColorScheme('Skyspider');
  palette = repeatPalette(orgPalette, 1);
  motif = new Motif({
    originX: width / 2,
    originY: height / 2,
  });
}

function draw() {
  background(backgroundColor);
	motif.run();
}