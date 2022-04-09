const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ], 
  //animate: true
};

const deg2Rad = (degree) => {
  return degree / 180 * Math.PI;
}

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const sketch = () => {


  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    let x, y;

    //context.fillStyle = 'black';

    const num = 24;
    const radius = width * 0.3;

    for (let i = 0;  i < num; i++){
      context.fillStyle = `rgba(${randomRange(100, 255)}, ${randomRange(100, 255)}, ${randomRange(100, 255)}, 0.9)`;
      context.strokeStyle = `rgba(${randomRange(100, 255)}, ${randomRange(100, 255)}, ${randomRange(100, 255)}, 1)`;
      const slice = deg2Rad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(randomRange(0.1, 2), random.range(0.2,1));

    
      context.beginPath();
      context.rect(-w * 0.5, randomRange(0,-h * 0.5), w, h);
      context.fill();
      context.restore();
 
      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);
      context.lineWidth = random.range(5,20);

      context.beginPath();
      context.arc(0 ,0 , radius * randomRange(0.7,1.3), slice * randomRange(1, -8), slice * randomRange(1, 5));
      context.stroke();
      context.restore();

    }
    
  };
};

canvasSketch(sketch, settings);
