const difficulties = {
  easy: { rows: 9, cols: 9, mines: 10 },
  normal: { rows: 12, cols: 12, mines: 22 },
  hard: { rows: 16, cols: 16, mines: 45 },
};

const boardElement = document.querySelector('#board');
const difficultyElement = document.querySelector('#difficulty');
const newGameButton = document.querySelector('#new-game');
const mineCountElement = document.querySelector('#mine-count');
const timerElement = document.querySelector('#timer');
const statusElement = document.querySelector('#status');

let config;
let board;
let gameOver;
let openedCells;
let flags;
let seconds;
let timerId;

function createGame() {
  config = difficulties[difficultyElement.value];
  gameOver = false;
  openedCells = 0;
  flags = 0;
  seconds = 0;
  clearInterval(timerId);
  timerId = null;
  timerElement.textContent = '0';
  statusElement.textContent = '행운을 빌어요!';
  mineCountElement.textContent = config.mines;
  board = createBoard(config.rows, config.cols, config.mines);
  renderBoard();
}

function createBoard(rows, cols, mines) {
  const cells = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      hasMine: false,
      isOpen: false,
      isFlagged: false,
      nearbyMines: 0,
    })),
  );

  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!cells[row][col].hasMine) {
      cells[row][col].hasMine = true;
      placedMines += 1;
    }
  }

  cells.flat().forEach((cell) => {
    cell.nearbyMines = getNeighbors(cells, cell).filter((neighbor) => neighbor.hasMine).length;
  });

  return cells;
}

function renderBoard() {
  boardElement.innerHTML = '';
  boardElement.style.gridTemplateColumns = `repeat(${config.cols}, 1fr)`;

  board.flat().forEach((cell) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'cell';
    button.dataset.row = cell.row;
    button.dataset.col = cell.col;
    button.setAttribute('aria-label', `${cell.row + 1}행 ${cell.col + 1}열`);
    button.addEventListener('click', () => openCell(cell));
    button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      toggleFlag(cell);
    });
    button.addEventListener('touchstart', startLongPress(cell), { passive: true });
    updateCellButton(button, cell);
    boardElement.appendChild(button);
  });
}

function updateCellButton(button, cell) {
  button.classList.toggle('open', cell.isOpen);
  button.classList.toggle('flagged', cell.isFlagged);
  button.classList.toggle('mine', cell.isOpen && cell.hasMine);
  button.dataset.count = cell.isOpen ? cell.nearbyMines : '0';
  button.disabled = cell.isOpen || gameOver;

  if (cell.isOpen && cell.hasMine) {
    button.textContent = '💣';
  } else if (cell.isFlagged) {
    button.textContent = '🚩';
  } else if (cell.isOpen && cell.nearbyMines > 0) {
    button.textContent = cell.nearbyMines;
  } else {
    button.textContent = '';
  }
}

function openCell(cell) {
  if (gameOver || cell.isOpen || cell.isFlagged) return;
  startTimer();

  if (cell.hasMine) {
    cell.isOpen = true;
    finishGame(false);
    return;
  }

  revealSafeArea(cell);
  refreshBoard();
  checkWin();
}

function revealSafeArea(startCell) {
  const queue = [startCell];

  while (queue.length > 0) {
    const cell = queue.shift();
    if (cell.isOpen || cell.isFlagged) continue;

    cell.isOpen = true;
    openedCells += 1;

    if (cell.nearbyMines === 0) {
      getNeighbors(board, cell).forEach((neighbor) => {
        if (!neighbor.isOpen && !neighbor.hasMine) queue.push(neighbor);
      });
    }
  }
}

function toggleFlag(cell) {
  if (gameOver || cell.isOpen) return;
  startTimer();

  cell.isFlagged = !cell.isFlagged;
  flags += cell.isFlagged ? 1 : -1;
  mineCountElement.textContent = config.mines - flags;
  refreshBoard();
}

function finishGame(didWin) {
  gameOver = true;
  clearInterval(timerId);
  statusElement.textContent = didWin ? '승리! 🎉' : '아쉬워요, 다시 도전!';

  if (!didWin) {
    board.flat().forEach((cell) => {
      if (cell.hasMine) cell.isOpen = true;
    });
  }

  refreshBoard();
}

function checkWin() {
  const safeCells = config.rows * config.cols - config.mines;
  if (openedCells === safeCells) finishGame(true);
}

function refreshBoard() {
  board.flat().forEach((cell) => {
    const button = boardElement.querySelector(`[data-row="${cell.row}"][data-col="${cell.col}"]`);
    updateCellButton(button, cell);
  });
}

function getNeighbors(cells, cell) {
  const neighbors = [];
  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
      if (rowOffset === 0 && colOffset === 0) continue;
      const row = cell.row + rowOffset;
      const col = cell.col + colOffset;
      if (cells[row]?.[col]) neighbors.push(cells[row][col]);
    }
  }
  return neighbors;
}

function startTimer() {
  if (timerId) return;
  timerId = setInterval(() => {
    seconds += 1;
    timerElement.textContent = seconds;
  }, 1000);
}

function startLongPress(cell) {
  let longPressTimer;
  return () => {
    longPressTimer = setTimeout(() => toggleFlag(cell), 550);
    window.addEventListener('touchend', () => clearTimeout(longPressTimer), { once: true });
  };
}

newGameButton.addEventListener('click', createGame);
difficultyElement.addEventListener('change', createGame);
createGame();
