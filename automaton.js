const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const gridSize = 100;
const cellSize = canvas.width / gridSize;
const grid = [];

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
    if (x > 0) neighbors.push(grid[x - 1][y]); // left neighbor
    if (x < gridSize - 1) neighbors.push(grid[x + 1][y]); // right neighbor
    if (y > 0) neighbors.push(grid[x][y - 1]); // up neighbor
    if (y < gridSize - 1) neighbors.push(grid[x][y + 1]); // down neighbor
    return neighbors[Math.floor(Math.random() * neighbors.length)];
}

function updateGrid() {
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = getRandomNeighbor(x, y);
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
    requestAnimationFrame(main);
}

initGrid();
drawGrid();
main();