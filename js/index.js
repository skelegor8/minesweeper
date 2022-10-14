let size = 10;
let cells;
let cellsSize = 50;
let playgroundCellsSize;
let bombs = [];
let bombCount = 15;
let bombFrequency = 0.2;
let number = [];
let numberColor = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];

let gameOver = false;

const playgroundCells = document.querySelector(".playground__cells");


function setup() {
  // Print cells
  for (let i = 0; i < Math.pow(size,2); i++) {
    const cell = document.createElement('div');
    cell.classList.add("playground__cell");
    playgroundCells.appendChild(cell);
  }

  cells = document.querySelectorAll(".playground__cell");
  playgroundCellsSize = Math.sqrt(cells.length);
  playgroundCells.style.width = playgroundCellsSize * cellsSize + 'px';

  document.documentElement.style.setProperty('--tileSize', `${cellsSize}px`);
  document.documentElement.style.setProperty('--playgroundCellsSize', `${playgroundCellsSize*cellsSize}px`);

  let x = 0;
  let y = 0;
  // bombs
  cells.forEach(cell => {
    cell.setAttribute('data-coords', `${x},${y}`)
    if (bombs.length < bombCount) {
      let random_boolean = Math.random() < bombFrequency;
      if (random_boolean) {
        bombs.push(`${x},${y}`);
        if (x > 0) {
          number.push(`${x - 1},${y}`);
        }
        if (x < playgroundCellsSize -1){
          number.push(`${x + 1},${y}`);
        }
        if (y > 0){
          number.push(`${x},${y - 1}`);
        }
        if (y < playgroundCellsSize - 1){
          number.push(`${x},${y + 1}`);
        }
        if (x > 0 && y > 0){
          number.push(`${x - 1},${y - 1}`);
        }
        if (x > 0 && y < playgroundCellsSize - 1){
          number.push(`${x - 1},${y + 1}`);
        }
        if (x < playgroundCellsSize-1 && y > 0){
          number.push(`${x + 1},${y - 1}`);
        }
        if (x < playgroundCellsSize - 1&& y < playgroundCellsSize-1){
          number.push(`${x + 1},${y + 1}`);
        }
      }
    }
    x++;
    if (x >= playgroundCellsSize) {
      x = 0;
      y++;
    }

    cell.oncontextmenu = function (event) {
      event.preventDefault();
      flag(cell);
    }

    cell.addEventListener('click', function (event) {
      clickCell(cell);
    })

  })

  number.forEach(num => {
    let coords = num.split(',');
    let cell = document.querySelectorAll(`[data-coords="${Number(coords[0])},${Number(coords[1])}"]`)[0];
    let dataNum = Number(cell.getAttribute('data-num'));
    if (!dataNum) {
      dataNum = 0;
    }
    cell.setAttribute('data-num', dataNum + 1);
})
}
setup();

function flag(cell) {
  if (gameOver) {
    return;
  }
  if (!cell.classList.contains('check-cell')) {
    if (!cell.classList.contains('flag-cell')) {
      cell.innerHTML = '🚩';
      cell.classList.add('flag-cell');
    } else {
      cell.innerHTML = '';
      cell.classList.remove('flag-cell');
    }
  }
}


function clickCell(cell) {
  if (gameOver) {
    return
  }
  if (cell.classList.contains('check-cell') || cell.classList.contains('flag-cell')) {
    return
  }
  let coordinate = cell.getAttribute('data-coords');
  if (bombs.includes(coordinate)) {
    endGame();
  } else {
    let num = cell.getAttribute('data-num');
    if (num != null) {
      cell.classList.add('check-cell');
      cell.innerHTML = num;
      cell.style.color = numberColor[num - 1];
      checkVictory();
      return;
    } 
    checkCell(coordinate);
  }
  cell.classList.add('check-cell');
}

function checkCell(coordinate) {
  let coords = coordinate.split(',');
  let x = parseInt(coords[0], 10);
  let y = parseInt(coords[1], 10);
  setTimeout(() => {
    if (x > 0) {
      clickCell(document.querySelectorAll(`[data-coords="${x - 1},${y}"]`)[0]);
    }
    if (x < playgroundCellsSize - 1) {
      clickCell(document.querySelectorAll(`[data-coords="${x + 1},${y}"]`)[0]);
    }
    if (y > 0) {
      clickCell(document.querySelectorAll(`[data-coords="${x},${y - 1}"]`)[0]);
    }
    if (y < playgroundCellsSize - 1) {
      clickCell(document.querySelectorAll(`[data-coords="${x},${y + 1}"]`)[0]);
    }
    if (x > 0 && y > 0) {
      clickCell(document.querySelectorAll(`[data-coords="${x - 1},${y - 1}"]`)[0]);
    }
    if (x > 0 && y < playgroundCellsSize - 1) {
      clickCell(document.querySelectorAll(`[data-coords="${x - 1},${y + 1}"]`)[0]);
    }
    if (x < playgroundCellsSize - 1 && y > 0) {
      clickCell(document.querySelectorAll(`[data-coords="${x + 1},${y - 1}"]`)[0]);
    }
    if (x < playgroundCellsSize - 1 && y < playgroundCellsSize - 1) {
      clickCell(document.querySelectorAll(`[data-coords="${x + 1},${y + 1}"]`)[0]);
    }
  }, 10);
}

function endGame() {
  
  gameOver = true;
  cells.forEach(cell => {
    let coordinate = cell.getAttribute('data-coords');
    if (bombs.includes(coordinate)) {
      cell.classList.remove('flag-cell');
      cell.classList.add('check-cell');
      cell.innerHTML = "💣";
    }
  })
}

function checkVictory() {
  let win = true;
  cells.forEach(cell => {
    let coordinate = cell.getAttribute('data-coords');
    if (!cell.classList.contains('check-cell') && !bombs.includes(coordinate)) {
      win = false;
    }
  });
  if (win) {
    gameOver = true;
  }
}

function newGame() {
  bombs = [];
  number = [];
  gameOver = false;
}








