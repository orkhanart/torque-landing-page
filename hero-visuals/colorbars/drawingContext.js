function resetDrawingContext() {
  drawingContext.restore();
}

function backgroundLinearGradient(colors, offsetColorStop = 0, rectMode = 'center', angleType = 'horizontal') {
  let x = 0;
  let y = 0;
  if(rectMode === 'center') {
    x = width/2;
    y = height/2;
  }
  setFillRectLinearGradient(x, y, width, height, colors, offsetColorStop, rectMode, angleType);
  rect(x, y, width, height);  
}

function backgroundRadialGradient(colors, offsetColorStop = 0, rectMode = 'center', w = 0) {
  let x = 0;
  let y = 0;
  if(rectMode === 'center') {
    x = width/2;
    y = height/2;
  }
  if (w === 0) {
    w = width / 2;
  }
  setFillRadialGradient(x, y, 0, x, y, x + w, colors, offsetColorStop);
  rect(x, y, width, height);  
}

function dropShadow(shadowColor = color(20), shadowBlur = 10, shadowOffsetX = 3, shadowOffsetY = 3) {
  drawingContext.shadowColor = shadowColor;
  drawingContext.shadowBlur = shadowBlur;
  drawingContext.shadowOffsetX = shadowOffsetX;
  drawingContext.shadowOffsetY = shadowOffsetY;
}

function resetShadow() {
  drawingContext.shadowColor = 'rgba(0,0,0,0)';
  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetX = 0;
  drawingContext.shadowOffsetY = 0;
}

function blur(blurAmount = 10) {
  drawingContext.filter = `blur(${blurAmount}px)`;
}

function resetBlur() {
  drawingContext.filter = 'none';
}

// ストライプ
function setStripe(props = {}) {
  const {
    stripeWidth = 20,
    colors = ['black', 'white'],
    angle = 0,
    offset = 0
  } = props;
  const canvas = document.createElement('canvas');
  canvas.width = stripeWidth * colors.length;
  canvas.height = stripeWidth * colors.length;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors[colors.length - 1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < colors.length - 1; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(i * stripeWidth, 0, stripeWidth, canvas.height);
  }
  const pattern = drawingContext.createPattern(canvas, 'repeat');
  drawingContext.save();
  drawingContext.translate(offset, 0);
  drawingContext.rotate(angle);
  drawingContext.fillStyle = pattern;
}

// 市松模様
function setCheckered(props = {}) {
  const {
    squareSize = 20,
    colors = ['black', 'white'],
    angle = 0,
    offset = 0
  } = props;
  
  const canvas = document.createElement('canvas');
  canvas.width = squareSize * 2;
  canvas.height = squareSize * 2;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors[1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, squareSize, squareSize);
  ctx.fillRect(squareSize, squareSize, squareSize, squareSize);
  
  const pattern = drawingContext.createPattern(canvas, 'repeat');
  drawingContext.save();
  drawingContext.translate(offset, 0);
  drawingContext.rotate(angle);
  drawingContext.fillStyle = pattern;
}

// 水玉模様
function setPolkaDot(props = {}) {
  const {
    dotSize = 10,
    spacing = 30,
    colors = ['black', 'white'],
    angle = 0,
    offset = 0
  } = props;
  
  const canvas = document.createElement('canvas');
  canvas.width = spacing;
  canvas.height = spacing;
  
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = colors[1];
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = colors[0];
  ctx.beginPath();
  ctx.arc( spacing / 2, spacing / 2, dotSize / 2, 0, Math.PI * 2 );
  ctx.fill();
  
  const pattern = drawingContext.createPattern(canvas, 'repeat');
  drawingContext.save();
  drawingContext.translate(offset, 0);
  drawingContext.rotate(angle);
  drawingContext.fillStyle = pattern;
}