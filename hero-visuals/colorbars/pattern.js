////////////////////////////////////////////////
class Element {
    constructor(props = {}) {
      this.id = props.id ?? 0;
      this.isDisplay = props.isDisplay ?? true;
      this.originX = props.originX ?? 0;
      this.originY = props.originY ?? 0;
      this.x = props.x ?? 0;
      this.y = props.y ?? 0;
      if (props.baseW !== undefined) {
        this.baseW = props.baseW;
        this.baseH = props.baseH;
        this.w = this.baseW;
        this.h = this.baseH;
      } else {
        this.w = props.w ?? 100;
        this.h = props.h ?? 100;
      }
      this.scaleX = props.scaleX ?? 1;
      this.scaleY = props.scaleY ?? 1;
      this.angle = props.angle ?? 0;
      this.fillColor = props.fillColor ?? color('rgba(0, 0, 0, 255)');
      this.strokeColor = props.strokeColor ?? color('rgba(0, 0, 0, 255)');
      this.backgroundColor = props.backgroundColor ?? color('rgba(0, 0, 0, 255)');
      this.offsetColorStop = props.offsetColorStop ?? 0;
      this.offsetColorStopAccel = props.offsetColorStopAccel ?? random(0.001, 0.0075);
      this.gradationStopNoise = props.gradationStopNoise ?? 0;
      this.gradientStartAngle = props.gradientStartAngle ?? 0;
      this.gradientX = props.gradientX ?? 0;
      this.gradientY = props.gradientY ?? 0;
      this.colors = props.colors ?? palette.colors.slice();
      this.phaseShift = 0.25;
      this.repetitions = 2;
      this.targetH = height * 3;
      this.baseH = height / 2;
      noStroke();
    }
  
    run = () => {
      if (!this.isDisplay) return;
      push();
      translate(this.originX, this.originY);
      scale(this.scaleX, this.scaleY);
      rotate(this.angle);
      fill(0, 0, 0);
      const gradientY =  (this.targetH/2 - this.baseH) * sin(frameCount * 0.025 - this.id * this.phaseShift) + this.targetH/2;
      setGradient({
        type: 'repeating-linear',
        style: 'fill',
        colors: this.colors,
        strokeColors: this.strokeColors,
        repetitions: this.repetitions,
        x0: this.x,
        y0: this.y,
        x1: this.x,
        y1: gradientY,
        colorStops: this.colorStops,
        offsetColorStop: this.offsetColorStop,
      });
      dropShadow(this.colors[0], 10, 2, 2)
      rect(this.x, this.y, this.w, this.h);
      pop();
    }
  }
  
  
  ////////////////////////////////////////////////
  
  class Motif {
    constructor(props = {}) {
      this.id = props.id ?? 0;
      this.isDisplay = props.isDisplay ?? true;
      this.originX = props.originX ?? 0;
      this.originY = props.originY ?? 0;
      this.x = props.x ?? 0;
      this.y = props.y ?? 0;
      if (props.baseSize !== undefined) {
        this.baseSize = props.baseSize;
        this.w = this.baseSize;
        this.h = this.baseSize;
      } else {
        this.w = props.w ?? 100;
        this.h = props.h ?? 100;
      }
      this.scaleX = props.scaleX ?? 1.0;
      this.scaleY = props.scaleY ?? 1.0;
      this.angle = props.angle ?? 0;
      this.repeatX = props.repeatX || 20; 
      this.elements = [];
      this.stepX = 50;
      this.offsetX = - (this.repeatX * this.stepX) / 2 + this.stepX / 2;
      for (var i = 0; i < this.repeatX; i++) {
        const element = new Element({
          id: i,
          originX: i * this.stepX + this.offsetX,
          originY: 0,
          w: 50,
          h: height,
        })
        this.elements.push(element);
      }
    }
  
    run = () => {
      push()
      translate(this.originX, this.originY);
      rotate(this.angle);
      for (let i = 0; i < this.elements.length; i++) {
        const element = this.elements[i];
        element.run();
      }
      pop();
    }
  }
  