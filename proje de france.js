let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let index = cell.getAttribute("data-index");

        if (board[index] !== "" || gameOver) return;

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();

        if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = "Tour du joueur " + currentPlayer;
        }
    });
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            gameOver = true;

            highlight([a, b, c]);

            statusText.textContent = "Le joueur " + board[a] + " a gagné ! 🎉";
            return;
        }
    }

    if (!board.includes("")) {
        gameOver = true;
        statusText.textContent = "Match nul ! 🤝";
    }
}

function highlight(indices) {
    indices.forEach(i => {
        cells[i].style.background = "yellow";
        cells[i].style.color = "black";
    });
}

resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    statusText.textContent = "Tour du joueur X";

    cells.forEach(c => {
        c.textContent = "";
        c.style.background = "#333";
        c.style.color = "white";
    });
});
