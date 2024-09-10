const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const restartButton = document.getElementById('restart-button');
const gridSizeSlider = document.getElementById('grid-size-slider');
const gridSizeSliderLabel = document.getElementById('grid-size-slider-label');
const speedSlider = document.getElementById('speed-slider');
const speedSliderLabel = document.getElementById('speed-slider-label');

let gridSize = 100;
let newGridSize = gridSize;
let cellSize;
let updateDelay = 50;
let newGrid = [];
let grid = [];


function initGrid() {
    for (let x = 0; x < gridSize; x++) {
        grid[x] = [];
        newGrid[x] = [];
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = getRandomColor();
        }
    }
}

function drawGrid() {
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            context.fillStyle = grid[x][y];
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
}

function getRandomNeighbor(x, y) {
    const neighbors = [];

    // Check left, right, up, down, and diagonals
    if (x > 0) neighbors.push(grid[x - 1][y]); // left
    if (x > 0 && y > 0) neighbors.push(grid[x - 1][y - 1]); // up left
    if (y > 0) neighbors.push(grid[x][y - 1]); // up
    if (x < gridSize - 1 && y > 0) neighbors.push(grid[x + 1][y - 1]); // up right
    if (x < gridSize - 1) neighbors.push(grid[x + 1][y]); // right
    if (x < gridSize - 1 && y < gridSize - 1) neighbors.push(grid[x + 1][y + 1]); // down right
    if (y < gridSize - 1) neighbors.push(grid[x][y + 1]); // down
    if (x > 0 && y < gridSize - 1) neighbors.push(grid[x - 1][y + 1]); // down left

    return neighbors[Math.floor(Math.random() * neighbors.length)];
}

function updateGrid() {
    const probability = 0.75;
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (Math.random() < probability) {
                newGrid[x][y] = getRandomNeighbor(x, y);
            }
            else {
                newGrid[x][y] = grid[x][y];
            }
        }
    }
    // Deep copy newGrid to grid
    grid = newGrid.map(arr => arr.slice());
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initValues() {
    gridSize = gridSizeSlider.value;
    gridSizeSliderLabel.textContent = "Grid size: " + gridSizeSlider.value;
    speedSliderLabel.textContent = "Speed: " + speedSlider.value;
    cellSize = canvas.width / gridSize;
}

function main() {
    updateGrid();
    drawGrid();
    setTimeout(main, updateDelay);
}

function restart() {
    initValues()
    initGrid();
    drawGrid();
    main();
}

restart();

gridSizeSlider.addEventListener('input', function () {
    gridSizeSliderLabel.textContent = "Grid size: " + gridSizeSlider.value;
    newGridSize = gridSizeSlider.value;
});

speedSlider.addEventListener('input', function () {
    const invertedValue = 100 - speedSlider.value;
    speedSliderLabel.textContent = "Speed: " + speedSlider.value;
    updateDelay = invertedValue;
});