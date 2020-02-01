let rows = +prompt('Input rows:', 6),
  cols = +prompt('Input cols:', 7);

let counter = 1,
  startRow = 0,
  startCol = 0,
  endRow = rows - 1,
  endCol = cols - 1;

renderMatrix(calculateMaxtrix());

// отрисовка элементов змейкой
function renderElements() {
  let cells = document.querySelectorAll('.cell');
  let counter = 1;

  setInterval(() => {
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent === String(counter)) {
        cells[i].style.opacity = '1';
      }
    }
    counter++;
  }, 100);
}

// отрисовка массива в HTML
function renderMatrix(matrix) {
  let rows = '';

  for (let i = 0; i < matrix.length; i++) {
    let cells = '';
    for (let j = 0; j < matrix[i].length; j++) {
      cells += '<div class="cell">' + matrix[i][j] + '</div>';
    }
    rows += '<div class="row">' + cells + '</div>';
  }

  document.getElementById('matrix-wrapper').insertAdjacentHTML('afterbegin', '<div class="matrix">' + rows + '</div>');
  renderElements();
}

// заполнение двумерного массива змейкой
function calculateMaxtrix() {
  let matrix = createMatrix(rows, cols);

  while (startCol <= endCol && startRow <= endRow) {

    // слева-направо
    for (let i = startCol; i <= endCol; i++) {
      matrix[startRow][i] = counter;
      counter++;
    }
    startRow++;

    // снизу-вверх
    for (let i = startRow; i <= endRow; i++) {
      matrix[i][endCol] = counter;
      counter++;
    }
    endCol--;

    // справа-налево
    for (let i = endCol; i >= startCol; i--) {
      matrix[endRow][i] = counter;
      counter++;
    }
    endRow--;

    // снизу-вверх
    for (let i = endRow; i >= startRow; i--) {
      matrix[i][startCol] = counter;
      counter++;
    }
    startCol++;
  }

  return matrix;
}

// создание пустого массива
function createMatrix(rows, cols) {
  let arr = new Array();

  for (let i = 0; i < rows; i++) {
    arr[i] = new Array();

    for (let j = 0; j < cols; j++) {
      arr[i][j] = ``;
    }
  }

  return arr;
}