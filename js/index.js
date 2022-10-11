let size = 10;
let cells;
let playgroundCellsSize;
let bombs = [];
let bombCount = 12;
let bombFrequency = 0.2;
let number = [];
let numberColor = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f1c40f', '#1abc9c', '#34495e', '#7f8c8d',];

let gameOver = false;

const playgroundCells = document.querySelector(".playground__cells");


function setup() {
  for (let i = 0; i < Math.pow(size,2); i++) {
    const cell = document.createElement('div');
    cell.classList.add("playground__cell");
    playgroundCells.appendChild(cell);
  }

  cells = document.querySelectorAll(".playground__cell");

  let x = 0;
  cells.forEach(cell => {
    cell.setAttribute('data-coord', `${x},${y}`);

    if (bombs.length < bombCount) {
      let random_boolean = Math.random() < bombFrequency;
      if (random_boolean) {
        
      }
    } else {

    }
  })

}

function clickCell() {
  
}

setup();








