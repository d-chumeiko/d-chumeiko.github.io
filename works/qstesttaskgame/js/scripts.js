let $result = document.getElementById('result');
let $start = document.getElementById('start');
let $stop = document.getElementById('stop');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let boxAppearance,
    drawingFrequency,
    boxes;

let colors = ['#FF0D00', '#FF7A73', '#FF8700', '#FFBD73', '#FFE900', '#FFEB73', '#9FEE00', '#2F8F00', '#009999', '#2A17B1', '#540EAD',
              '#9A6AD6', '#CD0074', '#E667AF', '#A61A00', '#63DD8D', '#000', '#804000', '#a6a6a6', '#77773c', '#ac3939', '#CB356B',
              '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED'];

$start.addEventListener('click', startGame);
$stop.addEventListener('click', stopGame);

function startGame() {
  $result.innerHTML = 0;
  requestAnimationFrame(game);
  canvas.style.backgroundColor = '#fff';
  hide($start);
  show($stop);
}

function stopGame() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
  clearInterval(boxAppearance);
  clearInterval(drawingFrequency);
  boxes.length = 0;
  canvas.style.backgroundColor = '#eee';
  show($start);
  hide($stop);
}

function game() {

  function BoxRender() {
    this.x = getRandom(0, canvas.width - 50);
    this.y = -50;
    this.w = 50;
    this.h = 50;

    this.randomColorIndex = getRandom(0, colors.length);
    this.color = colors[this.randomColorIndex];

    this.boxSpeed = getRandomSpeed(0.3, 1.1);

    this.drawBox = function() {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.w, this.h);
      this.moveBox();
    }

    this.moveBox = function() {
      this.y += this.boxSpeed;
    }
  }

  boxes = [];
  let time = getRandom(300, 500);

  function fillByBoxes() {
    boxes.push(new BoxRender());
  }

  function updateBoxes() {
   for (let i = 0; i < boxes.length; i++) boxes[i].moveBox();
  }

  function createBoxes() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    for(let i = 0; i < boxes.length; i++) boxes[i].drawBox();
    updateBoxes();
  }

  boxAppearance = setInterval(fillByBoxes, time);
  drawingFrequency = setInterval(createBoxes, 20);

  function isBoxClicked(x, y, boxes) {
    return x > boxes.x && x < boxes.x + boxes.w && y > boxes.y && y < boxes.y + boxes.h+10;
  }

  canvas.addEventListener('click', checkResult);

  function checkResult(e) {
    let x = e.offsetX;
    let y = e.offsetY+10;
    for (let i = boxes.length - 1; i >= 0; --i) {
      if (isBoxClicked(x, y, boxes[i])) {
        boxes.splice(i, 1);
        $result.innerHTML = +$result.innerHTML + 1;
      }
    }
  }

}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomSpeed(min, max) {
  return Math.random() * (max - min) + min;
}

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}
