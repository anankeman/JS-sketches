const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const Tweakpane = require('tweakpane');

const params = {
  maxDistance: 200,
  numAgents: 40,
};

const settings = {
  dimensions: [ 1080, 1080 ], 
  animate: true
};

function mod(n, m) {
  return ((n % m) + m) % m;
}

const sketch = ({ context, width, height }) => {
  const Agents = [];

  const numAgents = params.numAgents;

  for (let i = 0; i < numAgents; i++){
    const x = random.range(0, width);
    const y = random.range(0, height);
    Agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    //context.fillStyle = 'black';

    for (let i = 0; i < Agents.length; i++){
      const source = Agents[i];
      for (let j = i + 1; j < Agents.length; j++){
        const target = Agents[j];

        const dist = source.pos.getDistance(target.pos);

        if(dist > params.maxDistance) continue;

        context.lineWidth = math.mapRange(dist, 0, params.maxDistance, 12, 1);
        context.strokeStyle = `rgba(0, 0, 0, ${math.mapRange(dist, 0, params.maxDistance, 1, 0.1)})`;
        context.beginPath();
        context.moveTo(source.pos.x, source.pos.y);
        context.lineTo(target.pos.x, target.pos.y);
        context.stroke();
      }
    }

    context.strokeStyle = 'black';

    Agents.forEach( (a) =>{
      a.update();
      a.draw(context);
      a.wrap(width, height);
      //console.log(a.pos);
    });

  };
};

class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);

  }

  update(){
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  };

  bounce(width, height){
    if(this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if(this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }

  wrap(width, height){
    this.pos.x = mod(this.pos.x, width);  
    this.pos.y = mod(this.pos.y, height);
  }

  draw(context) {
    context.save();
    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 4;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }
}


const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder; 
  folder = pane.addFolder({title: 'Control '});
  folder.addInput(params, 'maxDistance', {min: 20, max: 1000});
  folder.addInput(params, 'numAgents', {min: 0, max: 100});
}

createPane();

canvasSketch(sketch, settings);
