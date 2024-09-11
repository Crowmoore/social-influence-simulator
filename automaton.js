const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const restartButton = document.getElementById("restart-button");
const toggleRunningButton = document.getElementById("toggle-running-button");
const gridSizeSlider = document.getElementById("grid-size-slider");
const gridSizeSliderLabel = document.getElementById("grid-size-slider-label");
const updateDelaySlider = document.getElementById("update-delay-slider");
const updateDelaySliderLabel = document.getElementById("update-delay-label");
const probabilitySlider = document.getElementById("probability-slider");
const probabilitySliderLabel = document.getElementById("probability-slider-label");
const notification = document.getElementById("notification");

let gridSize = gridSizeSlider.value;
let newGridSize = gridSize;
let cellSize;
let updateDelay = updateDelaySlider.value;
let probability = probabilitySlider.value;
let newGrid = [];
let grid = [];
let running = false;
let loopTimeoutId;

function initGrid() {
    for (let row = 0; row < gridSize; row++) {
        grid[row] = [];
        newGrid[row] = [];
        for (let column = 0; column < gridSize; column++) {
            grid[row][column] = getRandomColor();
        }
    }
}

function drawGrid() {
    for (let row = 0; row < gridSize; row++) {
        for (let column = 0; column < gridSize; column++) {
            context.fillStyle = grid[row][column];
            context.fillRect(row * cellSize, column * cellSize, cellSize, cellSize);
        }
    }
}

function getRandomNeighbor(row, column) {
    const neighbors = [];

    // Check left, right, up, down, and diagonals
    if (row > 0) neighbors.push(grid[row - 1][column]); // left
    if (row > 0 && column > 0) neighbors.push(grid[row - 1][column - 1]); // up left
    if (column > 0) neighbors.push(grid[row][column - 1]); // up
    if (row < gridSize - 1 && column > 0) neighbors.push(grid[row + 1][column - 1]); // up right
    if (row < gridSize - 1) neighbors.push(grid[row + 1][column]); // right
    if (row < gridSize - 1 && column < gridSize - 1) neighbors.push(grid[row + 1][column + 1]); // down right
    if (column < gridSize - 1) neighbors.push(grid[row][column + 1]); // down
    if (row > 0 && column < gridSize - 1) neighbors.push(grid[row - 1][column + 1]); // down left

    return neighbors[Math.floor(Math.random() * neighbors.length)];
}

function updateGrid() {
    for (let row = 0; row < gridSize; row++) {
        for (let column = 0; column < gridSize; column++) {
            if (Math.random() < probability) {
                newGrid[row][column] = getRandomNeighbor(row, column);
            }
            else {
                newGrid[row][column] = grid[row][column];
            }
        }
    }
    // Swap grid with newGrid
    let temp = grid;
    grid = newGrid;
    newGrid = temp;
}

function getRandomColor() {
    const characters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initValues() {
    gridSize = gridSizeSlider.value;
    gridSizeSliderLabel.textContent = "Grid size: " + gridSizeSlider.value;
    updateDelaySliderLabel.textContent = "Update delay: " + updateDelaySlider.value + "ms";
    probabilitySliderLabel.textContent = "Probability: " + probabilitySlider.value + "%";
    notification.style.visibility = "hidden";
    cellSize = canvas.width / gridSize;
}

function mainLoop() {
    if (running) {
        updateGrid();
        drawGrid();
        loopTimeoutId = setTimeout(mainLoop, updateDelay);
    }
}

function restart() {
    clearTimeout(loopTimeoutId);
    initValues()
    initGrid();
    drawGrid();
    mainLoop();
}

function setup() {
    initValues();
    initGrid();
    drawGrid();
}

function toggleRunning() {
    running = !running;
    if (running) {
        toggleRunningButton.textContent = "Stop";
        mainLoop();
    } else {
        clearTimeout(loopTimeoutId);
        toggleRunningButton.textContent = "Start";
    }
}

setup();

gridSizeSlider.addEventListener("input", function () {
    gridSizeSliderLabel.textContent = "Grid size: " + gridSizeSlider.value;
    newGridSize = gridSizeSlider.value;
    notification.style.visibility = "visible";
});

updateDelaySlider.addEventListener("input", function () {
    updateDelaySliderLabel.textContent = "Update delay: " + updateDelaySlider.value + "ms";
    updateDelay = updateDelaySlider.value;
});

probabilitySlider.addEventListener("input", function () {
    probabilitySliderLabel.textContent = "Probability: " + probabilitySlider.value + "%";
    probability = probabilitySlider.value / 100;
});