
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;


const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button')
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    
    if (gameBoard[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer === 'X' ? 'x-mark' : 'o-mark');

    handleResultValidation();
}


function handleResultValidation() {
    let roundWon = false;

    
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

     
        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && a === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won! 🎉`;
        isGameActive = false;
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        statusDisplay.textContent = 'Game ended in a draw! 🤝';
        isGameActive = false;
        return;
    }

   
    handlePlayerChange();
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}


function handleRestartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-mark', 'o-mark');
    });
}


cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', handleRestartGame);