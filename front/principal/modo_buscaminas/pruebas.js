
const board = document.getElementById("game-board");
const coinsDisplay = document.getElementById("coins");
const multiplierDisplay = document.getElementById("multiplier");
const currentWinningsDisplay = document.getElementById("current-winnings");
const startButton = document.getElementById("start-btn");
const withdrawButton = document.getElementById("withdraw-btn");
const statusDisplay = document.getElementById("status");
const gridSizeSelector = document.getElementById("grid-size");

let coins = sessionStorage.getItem("coins"); // Monedas iniciales
let currentWinnings = 0; // Ganancias actuales
let multiplier = 1.0; // Multiplicador inicial
let costPerGame = 0; // Costo del juego según el tamaño
let rows = 0; // Número de filas
let cols = 0; // Número de columnas
let numGnomes = 0; // Número de gnomos
let gameStarted = false; // Estado del juego
let gameBoard = []; // Tablero del juego

// Actualiza el HUD (interfaz de usuario)
function updateHUD() {
    coinsDisplay.textContent = coins.toLocaleString();
    multiplierDisplay.textContent = `${multiplier.toFixed(2)}x`;
    currentWinningsDisplay.textContent = currentWinnings.toLocaleString();
}

// Calcula el costo según el tamaño seleccionado
function calculateCost() {
    const gridSize = gridSizeSelector.value;
    if (gridSize === "2x2") return 50000;
    if (gridSize === "3x3") return 100000;
    if (gridSize === "5x5") return 250000;
    if (gridSize === "6x6") return 500000;
}

// Configura el tablero del juego
function setupBoard() {
    board.innerHTML = ""; // Limpia el tablero
    const [gridRows, gridCols] = gridSizeSelector.value.split("x").map(Number);
    rows = gridRows;
    cols = gridCols;
    numGnomes = Math.floor((rows * cols) / 4); // Un cuarto de las celdas son gnomos
    gameBoard = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({ hasGnome: false, revealed: false }))
    );

    // Coloca los gnomos aleatoriamente
    let gnomesPlaced = 0;
    while (gnomesPlaced < numGnomes) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!gameBoard[row][col].hasGnome) {
            gameBoard[row][col].hasGnome = true;
            gnomesPlaced++;
        }
    }

    // Genera las celdas del tablero
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", () => revealCell(i, j, cell));
            board.appendChild(cell);
        }
    }
}

// Revela una celda seleccionada
function revealCell(row, col, cell) {
    if (gameBoard[row][col].revealed || !gameStarted) return;

    gameBoard[row][col].revealed = true;

    if (gameBoard[row][col].hasGnome) {
        cell.classList.add("gnome", "revealed");
        cell.textContent = "🧙";
        statusDisplay.textContent = "¡Te atrapó un gnomo! Juego terminado.";
        withdrawButton.disabled = true;
        gameStarted = false;
        revealAll();
    } else {
        cell.classList.add("revealed");
        cell.textContent = "💰";
        multiplier += 0.25; // Incrementa el multiplicador
        currentWinnings = Math.floor(costPerGame * multiplier);
        withdrawButton.disabled = false;
        updateHUD();

        // Verifica si el jugador ganó al revelar todas las celdas seguras
        if (checkWinCondition()) {
            statusDisplay.textContent = "¡Has encontrado todos los tesoros!";
            gameStarted = false;
        }
    }
}

// Revela todas las celdas al terminar el juego
function revealAll() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.querySelector(
                `.cell[data-row="${i}"][data-col="${j}"]`
            );
            if (gameBoard[i][j].hasGnome) {
                cell.classList.add("gnome", "revealed");
                cell.textContent = "🧙";
            } else if (!gameBoard[i][j].revealed) {
                cell.classList.add("revealed");
                cell.textContent = "💰";
            }
        }
    }
}

// Verifica si todas las celdas seguras han sido reveladas
function checkWinCondition() {
    let revealedCells = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!gameBoard[i][j].hasGnome && gameBoard[i][j].revealed) {
                revealedCells++;
            }
        }
    }
    return revealedCells === rows * cols - numGnomes;
}

// Retira las ganancias actuales
function withdrawWinnings() {
    coins += currentWinnings;
    updateHUD();
    statusDisplay.textContent = `¡Has retirado ${currentWinnings.toLocaleString()} monedas!`;
    currentWinnings = 0;
    withdrawButton.disabled = true;
    gameStarted = false;
    board.innerHTML = "";
}

// Inicia el juego
function startGame() {
    costPerGame = calculateCost();

    if (coins < costPerGame) {
        statusDisplay.textContent = "No tienes suficientes monedas para jugar.";
        return;
    }

    coins -= costPerGame;
    multiplier = 1.0;
    currentWinnings = 0;
    updateHUD();
    setupBoard();
    gameStarted = true;
    statusDisplay.textContent = "¡Buena suerte!";
    withdrawButton.disabled = true;
}

// Agrega event listeners a los botones
startButton.addEventListener("click", startGame);
withdrawButton.addEventListener("click", withdrawWinnings);

// Actualiza el HUD inicial
updateHUD();


let userId = sessionStorage.getItem("userId")
console.log(userId)
postData("loadGame", userId, (game)=>{
    console.log(game)
    window.game= game;
    return game
})

function save(games) {
    console.log(games)
    if (games !== null && games){
        console.log(games)
        games.currency.sunflowers = coins
        postData("save", games, (ok)=>{
            if (ok.ok){
                return ok
            }
        })
    }
}
function goBack() {
    save(game)
    console.log("ñe")
    window.history.back(); // Regresa a la página anterior
}