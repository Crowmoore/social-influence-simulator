const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const gridSize = 100;
const cellSize = canvas.width / gridSize;
const grid = [];
const updateDelay = 50;

function initGrid() {
    for (let x = 0; x < gridSize; x++) {
        grid[x] = [];
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
                grid[x][y] = getRandomNeighbor(x, y);
            }
        }
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function main() {
    updateGrid();
    drawGrid();
    setTimeout(main, updateDelay);
}

initGrid();
drawGrid();
main();