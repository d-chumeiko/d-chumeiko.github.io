let btnStart = document.getElementById('start');
let btnStop = document.getElementById('stop');

let canvas = document.getElementById("drawingCanvas");
let ctx = canvas.getContext("2d");

let balls = [];

let colors = ['#FF0D00', '#FF7A73', '#FF8700', '#FFBD73', '#FFE900', '#FFEB73', '#9FEE00', '#2F8F00', '#009999', '#2A17B1', '#540EAD',
              '#9A6AD6', '#CD0074', '#E667AF', '#A61A00', '#63DD8D', '#000', '#804000', '#a6a6a6', '#77773c', '#ac3939', '#CB356B',
              '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];

startDrawing = setTimeout(draw, 20);

btnStart.addEventListener('click', start);
btnStop.addEventListener('click', stop);

function start() {
  addBall();
  startBouncing = setInterval(addBall, 5000);
  canvas.style.backgroundColor = '#fff';
  hide(btnStart);
  show(btnStop);
}

function stop() {
  clearCanvas();
  clearInterval(startBouncing);
  clearBalls();
  canvas.style.backgroundColor = '#eee';
  show(btnStart);
  hide(btnStop);
}

class Ball {
  constructor(dx, dy, radius, color) {
    
    radius > 40 ? this.x = 20 : this.x = 5;
    this.y = radius/1.5;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.color = color;
    this.strokeColor = "black";
  }
}

function addBall() {

  let dx = getRandom(15, 30);
  let dy = getRandom(15, 30);
  let radius = getRandom(5, 50);
  let color = colors[getRandom(0, colors.length)]
  
  let ball = new Ball(dx, dy, radius, color);

  if (balls.length < 20) balls.push(ball);
}

function clearBalls() {
  balls = [];
}

function draw() {

  clearCanvas();
  ctx.beginPath();

  balls.forEach(ball => {

    ball.x += ball.dx;
    ball.y += ball.dy;

    ball.dy += 0.15;
    ball.dx *=  0.996;

    if ((ball.x + ball.dx > canvas.width - ball.radius) || (ball.x + ball.dx < ball.radius)) {
        ball.dx = -ball.dx;
    }

    if ((ball.y + ball.dy > canvas.height - ball.radius + 1) || (ball.y + ball.dy < ball.radius)) { 
        ball.dy = -ball.dy*0.7; 
    }

    ctx.beginPath();
    ctx.fillStyle = ball.color;

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fill();
    ctx.stroke(); 
  });

  setTimeout(draw, 20);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function show(el) {
  el.classList.remove('hidden');
}

function hide(el) {
  el.classList.add('hidden');
}