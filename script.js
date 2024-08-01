// script.js
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetGameButton = document.getElementById('reset-game');
const startGameButton = document.getElementById('start-game');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const player1NameDisplay = document.getElementById('player1-name-display');
const player2NameDisplay = document.getElementById('player2-name-display');
const gameContainer = document.querySelector('.game-container');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = false;

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

startGameButton.addEventListener('click', startGame);

function startGame() {
    const player1Name = player1NameInput.value;
    const player2Name = player2NameInput.value;

    if (player1Name && player2Name) {
        isGameActive = true;
        player1NameDisplay.textContent = player1Name;
        player2NameDisplay.textContent = player2Name;
        gameContainer.classList.remove('hidden');
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    } else {
        alert('Please enter both player names.');
    }
}

function handleCellClick(event) {
    if (!isGameActive) return;

    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '') {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `${currentPlayer === 'X' ? player1NameDisplay.textContent : player2NameDisplay.textContent} has won!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = 'It\'s a draw!';
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    isGameActive = false;
    currentPlayer = 'X';

    cells.forEach(cell => {
        cell.textContent = '';
    });

    gameContainer.classList.add('hidden');
    player1NameInput.value = '';
    player2NameInput.value = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetGameButton.addEventListener('click', resetGame);