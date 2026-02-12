/*
 * Text Visualization - p5.js port
 * Original Processing code by Diana Lange 2012
 * www.diana-lange.de
 *
 * https://vimeo.com/dianalange
 * https://twitter.com/dianaontheroad
 * http://www.flickr.com/photos/dianalange/
 */

let centerX = 0, centerY = 0, offsetX = 0, offsetY = 0;
let zoom = 0.3;
let drehen; // TWO_PI

let txt = " ";
let dir = [];
let letters = new Map();
let letterMinCount = 10000, letterMaxCount = 0;
let words = [];

let wR = 400, wL = 70, lL = 60, lR = 280, wbL = 25, lbL = 80;

// Text samples
const buergschaft = "Zu Dionys, dem Tyrannen, schlich Damon, den Dolch im Gewande: Ihn schlugen die Häscher in Bande, \"Was wolltest du mit dem Dolche? sprich!\" Entgegnet ihm finster der Wüterich. \"Die Stadt vom Tyrannen befreien!\" \"Das sollst du am Kreuze bereuen.\" \"Ich bin\", spricht jener, \"zu sterben bereit Und bitte nicht um mein Leben: Doch willst du Gnade mir geben, Ich flehe dich um drei Tage Zeit, Bis ich die Schwester dem Gatten gefreit; Ich lasse den Freund dir als Bürgen, Ihn magst du, entrinn' ich, erwürgen.\" Da lächelt der König mit arger List Und spricht nach kurzem Bedenken: \"Drei Tage will ich dir schenken; Doch wisse, wenn sie verstrichen, die Frist, Eh' du zurück mir gegeben bist, So muß er statt deiner erblassen, Doch dir ist die Strafe erlassen.\" Und er kommt zum Freunde: \"Der König gebeut, Daß ich am Kreuz mit dem Leben Bezahle das frevelnde Streben. Doch will er mir gönnen drei Tage Zeit, Bis ich die Schwester dem Gatten gefreit; So bleib du dem König zum Pfande, Bis ich komme zu lösen die Bande.\" Und schweigend umarmt ihn der treue Freund Und liefert sich aus dem Tyrannen; Der andere ziehet von dannen. Und ehe das dritte Morgenrot scheint, Hat er schnell mit dem Gatten die Schwester vereint, Eilt heim mit sorgender Seele, Damit er die Frist nicht verfehle.";

const moor = "O schaurig ist's übers Moor zu gehn, Wenn es wimmelt vom Heiderauche, Sich wie Phantome die Dünste drehn Und die Ranke häkelt am Strauche, Unter jedem Tritte ein Quellchen springt, Wenn aus der Spalte es zischt und singt, O schaurig ist's übers Moor zu gehn, Wenn das Röhricht knistert im Hauche! Fest hält die Fibel das zitternde Kind Und rennt als ob man es jage; Hohl über der Fläche sauset der Wind - Was raschelt da drüben im Hage? Das ist der gespentische Gräberknecht, Der dem Meister die besten Torfe verzecht; Hu, hu, es bricht wie ein irres Rind! Hinducket das Knäblein sich zage.";

const braut = "Nach Korinthus von Athen gezogen Kam ein Jüngling, dort noch unbekannt. Einen Bürger hofft' er sich gewogen; Beide Väter waren gastverwandt, Hatten frühe schon Töchterchen und Sohn Braut und Bräutigam voraus genannt. Aber wird er auch willkommen scheinen, Wenn er teuer nicht die Gunst erkauft? Er ist noch ein Heide mit den Seinen, Und sie sind schon Christen und getauft. Keimt ein Glaube neu, Wird oft Lieb' und Treu Wie ein böses Unkraut ausgerauft.";

// Vec2D class
class Vec2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  init(centerX, centerY, angle, d) {
    this.x = centerX + cos(angle) * d;
    this.y = centerY + sin(angle) * d;
  }
}

// Letter class
class Letter {
  constructor(c, count = 1) {
    this.c = c;
    this.count = count;
  }

  increase() {
    this.count++;
  }
}

// Word class
class Word {
  constructor(txt) {
    this.txt = txt;
    this.lowerCaseTxt = txt.toLowerCase();
    this.count = 1;
  }

  increase() {
    this.count++;
  }

  chars() {
    return this.lowerCaseTxt.split('');
  }
}

function initEmptyVec2DArray(n) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a.push(new Vec2D());
  }
  return a;
}

function setup() {
  createCanvas(900, 450);

  drehen = TWO_PI;
  centerX = width / 3;
  centerY = height / 2;

  cursor(HAND);
  colorMode(HSB, 360, 100, 100, 100);

  words = [];
  if (frameCount === 0) txt = buergschaft;
  txt = buergschaft; // Default text

  const delimiters = /[ ,.?!;:+()\&\"\']+/;

  countLetters(txt);
  createWordArray(txt.split(delimiters).filter(w => w.length > 0));
  initDir(words.length, 3);
}

function draw() {
  background(0, 0, 97);

  if (mouseIsPressed) {
    centerX = mouseX - offsetX;
    centerY = mouseY - offsetY;
  }

  push();
  translate(centerX, centerY);
  rotate(drehen);
  scale(zoom);

  visualizeLetters(txt, 0, 0, lL, lR);
  visualizeText(0, 0, wR, wL, wbL, lbL, -PI / 5);
  pop();
}

function countLetters(raw) {
  letters = new Map();

  for (let i = 0; i < raw.length; i++) {
    let c = raw.toLowerCase().charAt(i);

    if (c !== ' ' && letters.has(c)) {
      let l = letters.get(c);
      l.increase();
      letters.set(c, new Letter(c, l.count));
    } else {
      letters.set(c, new Letter(c));
    }
  }

  checkMinMaxLetterCount();
}

function checkMinMaxLetterCount() {
  letterMinCount = 10000;
  letterMaxCount = 0;

  for (let [key, l] of letters) {
    if (l.count > letterMaxCount) letterMaxCount = l.count;
    if (l.count < letterMinCount) letterMinCount = l.count;
  }
}

function createWordArray(raw) {
  for (let i = 0; i < raw.length; i++) {
    let foundInList = false;
    for (let j = 0; j < words.length; j++) {
      if (words[j].txt === raw[i].toLowerCase()) {
        words[j].increase();
        foundInList = true;
        break;
      }
    }

    if (!foundInList) {
      words.push(new Word(raw[i].toLowerCase()));
    }
  }
}

function mousePressed() {
  offsetX = mouseX - centerX;
  offsetY = mouseY - centerY;
}

function keyPressed() {
  if (key === 'q') wL -= 5;
  if (key === 'w') wL += 5;

  if (key === 'a') wR -= 5;
  if (key === 's') wR += 5;

  if (key === 'e') lL -= 5;
  if (key === 'r') lL += 5;

  if (key === 'd') lR -= 5;
  if (key === 'f') lR += 5;

  if (key === 'z') wbL -= 1;
  if (key === 'u') wbL += 1;

  if (key === 'h') lbL -= 5;
  if (key === 'j') lbL += 5;

  wL = constrain(wL, 10, width);
  wR = constrain(wR, 10, width);
  lL = constrain(lL, 10, width);
  lR = constrain(lR, lL + 10, width);
  wbL = constrain(wbL, 1, width);
  lbL = constrain(lbL, 5, width);

  if (key === '1') {
    txt = buergschaft;
    setup();
  }

  if (key === '2') {
    txt = moor;
    setup();
  }

  if (key === '3') {
    txt = braut;
    setup();
  }

  if (keyCode === UP_ARROW) {
    zoom += 0.02;
  }
  if (keyCode === DOWN_ARROW) {
    zoom -= 0.02;
  }

  if (keyCode === RIGHT_ARROW) {
    drehen += PI / 18;
  }
  if (keyCode === LEFT_ARROW) {
    drehen -= PI / 18;
  }

  if (key === ' ') initDir(words.length, 3);
}

function drawLineVec(start, end, c, sw) {
  stroke(c);
  strokeWeight(sw);
  line(start.x, start.y, end.x, end.y);
}

function drawCurve(pos, c, sw) {
  noFill();
  stroke(c);
  strokeWeight(sw);
  beginShape();
  for (let i = 0; i < pos.length; i++) {
    curveVertex(pos[i].x, pos[i].y);
    if (i === 0 || i === pos.length - 1) {
      curveVertex(pos[i].x, pos[i].y);
    }
  }
  endShape();
}

function drawEllipseFull(doFill, doStroke, fillC, strokeC, sw, d, x, y) {
  if (!doStroke && doFill) {
    noStroke();
    fill(fillC);
    ellipse(x, y, d, d);
  } else if (doStroke && doFill) {
    stroke(strokeC);
    strokeWeight(sw);
    fill(fillC);
    ellipse(x, y, d, d);
  } else if (doStroke && !doFill) {
    noFill();
    stroke(strokeC);
    strokeWeight(sw);
    ellipse(x, y, d, d);
  }
}

function visualizeLetters(raw, cX, cY, centerR, r) {
  let c = color(0, 35, 75, 60);
  let a = 0;

  let linePos = initEmptyVec2DArray(2);

  for (let i = 0; i < raw.length; i++) {
    let ch = raw.toLowerCase().charAt(i);

    if (!letters.has(ch)) continue;

    let l = letters.get(ch);
    a = TWO_PI / raw.length * i;

    linePos[0].init(cX, cY, a, centerR);
    linePos[1].init(cX, cY, a, map(l.count, letterMinCount, letterMaxCount, centerR, r));

    let lineColor = color(360.0 / raw.length * i, saturation(c), brightness(c), alpha(c));
    drawLineVec(linePos[0], linePos[1], lineColor, 0.4);
  }
}

function initDir(n, maxVal) {
  dir = [];
  for (let i = 0; i < n; i++) {
    dir.push(floor(random(0, maxVal)));
  }
}

function visualizeText(cX, cY, r, l, l2, letterL, startAngle) {
  let curvePos = initEmptyVec2DArray(4);
  let letterPos = initEmptyVec2DArray(4);

  for (let i = 0; i < words.length; i++) {
    visualizeWords(cX, cY, words[i], r, l, l2, letterL,
      startAngle + i * TWO_PI / words.length,
      TWO_PI / words.length, words.length, curvePos, letterPos);
  }
}

function createColorByCount(count) {
  let h = constrain(count * 18, 0, 360);
  if (h > 58 && h < 193) {
    return color(h, 70, 70, 50);
  } else {
    return color(h, constrain(100 - count, 20, 100), constrain(50 + count, 45, 100), constrain(20 + count, 40, 70));
  }
}

function createPosForMultiWords(cX, cY, curvePos, i, a, s, r, dis) {
  if (dir[i] === 0) {
    curvePos[1].init(cX, cY, a + (-s * 8), r + dis * 0.3333);
    curvePos[2].init(cX, cY, a + (s * 14), r + dis * 0.66667);
  } else if (dir[i] === 1) {
    curvePos[1].init(cX, cY, a + (s * 16), r + dis * 0.25);
    curvePos[2].init(cX, cY, a + (-s * 10), r + dis * 0.75);
  } else {
    curvePos[1].init(cX, cY, a + (s * 18), r + dis * 0.4);
    curvePos[2].init(cX, cY, a + (s * 8), r + dis * 0.8);
  }
}

function visualizeWords(cX, cY, w, radius, minL, maxL, letterL, angle, steps, length, curvePos, letterPos) {
  let c = createColorByCount(w.count);

  let targetRadius = minL + radius + w.count * maxL + 50 / length;

  curvePos[0].init(cX, cY, angle, radius);
  curvePos[3].init(cX, cY, angle, targetRadius);

  let distance = dist(curvePos[0].x, curvePos[0].y, curvePos[3].x, curvePos[3].y);
  let sw = 3 + w.count / 4;

  if (w.count > 1) {
    createPosForMultiWords(cX, cY, curvePos, w.count, angle, steps, radius, distance);
    drawCurve(curvePos, c, sw);
    drawEllipseFull(true, false, color(hue(c), saturation(c), brightness(c), 100), null, 0, 15 + w.count * 4, curvePos[3].x, curvePos[3].y);
  } else {
    curvePos[3].init(cX, cY, angle, targetRadius);
    drawLineVec(curvePos[0], curvePos[3], color(hue(c), saturation(c), brightness(c), 100), 1.0);
    drawEllipseFull(false, true, null, color(hue(c), saturation(c), brightness(c), 100), 1.0, 15 + w.count * 4, curvePos[3].x, curvePos[3].y);
  }

  drawSplittedWords(w.chars(), c, w.count, letterL, angle, curvePos, letterPos, 15 + w.count * 4, dir[w.count] || 0);
}

function drawSplittedWords(ch, c, n, startL, angle, curvePos, letterPos, startRadius, direction) {
  let letterAngle = angle - PI / 4;
  let letterSteps = 0.5 * TWO_PI / ch.length;
  let letterRadius = startL;

  let letterDistance = dist(letterPos[0].x, letterPos[0].y, letterPos[2].x, letterPos[2].y);

  letterPos[0].init(curvePos[3].x, curvePos[3].y, letterAngle, startRadius / 2);

  for (let i = 0; i < ch.length; i++) {
    if (!letters.has(ch[i])) continue;

    let l = letters.get(ch[i]);

    letterRadius = startL + l.count;
    letterPos[2].init(curvePos[3].x, curvePos[3].y, letterAngle, letterRadius);

    if (direction === 0) {
      letterPos[1].init(curvePos[3].x, curvePos[3].y, letterAngle + (-letterSteps * 7), startRadius / 2 + letterDistance / 2);
      letterPos[3].init(curvePos[3].x, curvePos[3].y, letterAngle + (letterSteps / 3), letterRadius + letterDistance / 10);
    } else if (direction === 1) {
      letterPos[1].init(curvePos[3].x, curvePos[3].y, letterAngle + (-letterSteps * 3), startRadius / 2 + letterDistance / 3);
      letterPos[3].init(curvePos[3].x, curvePos[3].y, letterAngle + (letterSteps / 3), letterRadius + letterDistance / 5);
    } else {
      letterPos[1].init(curvePos[3].x, curvePos[3].y, letterAngle - letterSteps / 3, startRadius / 2 + letterDistance * 3 / 5);
      letterPos[3].init(curvePos[3].x, curvePos[3].y, letterAngle + (letterSteps / 3), letterRadius + letterDistance / 10);
    }

    drawCurve(letterPos, c, 0.5);

    if (n > 2) {
      drawEllipseFull(true, true, color(0, 0, 97, 100), color(0, 0, 0, 100), 0.5, 20 + n * 2, letterPos[3].x, letterPos[3].y);
    }

    letterAngle += letterSteps;
  }
}
