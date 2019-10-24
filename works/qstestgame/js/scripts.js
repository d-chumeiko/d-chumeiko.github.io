let $result = document.getElementById('result');
let $start = document.getElementById('start');
let $stop = document.getElementById('stop');
let canvas = document.getElementById('canvas');
let $ctx = canvas.getContext('2d');

let boxApperanceSpeed,
    animate2Interval;

let colors = ['#FF0D00', '#FF7A73', '#FF8700', '#FFBD73', '#FFE900', '#FFEB73', '#9FEE00', '#2F8F00', '#009999', '#2A17B1', '#540EAD', '#9A6AD6', '#CD0074', '#E667AF', '#A61A00', '#63DD8D', '#000', '#804000', '#a6a6a6', '#77773c', '#ac3939'];

$start.addEventListener('click', startGame);
$stop.addEventListener('click', stopGame);

function startGame() {
  requestAnimationFrame(game);
  canvas.style.backgroundColor = '#fff';
  hide($start);
  show($stop);
}

function stopGame() {
  clearInterval(boxAppearanceSpeed);
  clearInterval(animate2Interval);
  $ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
	$result.innerHTML = 0;
  canvas.style.backgroundColor = '#ccc';
  show($start);
  hide($stop);
}


function game() {

  function Box() {
    this.x = getRandom(0, canvas.width - 40);
    this.y = -40;
    this.w = 40;
    this.h = 40;

    this.randomColorIndex = getRandom(0, colors.length);
    this.color = colors[this.randomColorIndex];

    this.boxSpeed = getRandom(0, 3);

    this.createBox = function() {
      $ctx.fillStyle = this.color;
      $ctx.fillRect(this.x, this.y, this.w, this.h);
      this.boxMovement();
    }

    this.boxMovement = function() {
      this.y += this.boxSpeed;
    }

  }

  let boxes = [];

  function draw() {
    $ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    for(i = 0; i < boxes.length; i++) boxes[i].createBox();
    update();
  }

  function update() {
   for (var i = 0; i < boxes.length; i++) boxes[i].boxMovement();
  }

  let time = getRandom(50, 200);

  boxAppearanceSpeed = setInterval(function () {
    boxes.push(new Box());
  }, time);

  animate2Interval = setInterval(draw, 20);

  let isBoxClicked = function(x, y, boxes) {
    return x > boxes.x && x < boxes.x + boxes.w && y > boxes.y && y < boxes.y + boxes.h;
  }

  canvas.onclick = function(e) {
    let x = e.offsetX;
    let y = e.offsetY+20;

    for (let i = boxes.length - 1; i >= 0; --i) {
      if (isBoxClicked(x, y, boxes[i])) {
        boxes.splice(i, 1);
        $result.innerHTML = Number($result.innerHTML) + 1;
      }
    }
  }

  // $canvas.addEventListener('click', checkResult);

}


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function show($el) {
  $el.classList.remove('hide');
}

function hide($el) {
  $el.classList.add('hide');
}
