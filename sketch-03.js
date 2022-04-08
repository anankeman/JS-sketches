const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'black';

    const Agents = [];

    for (let i = 0; i < 40; i++){
      const x = random.range(0, width);
      const y = random.range(0, height);
      Agents.push(new Agent(x, y));
    }

    Agents.forEach( (a) =>{
      a.draw(context);
    });

  };
};

class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = 10;

  }

  draw(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}

canvasSketch(sketch, settings);
