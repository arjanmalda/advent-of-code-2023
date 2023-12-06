const fs = require("fs");

const input = fs.readFileSync("day3/input.txt");

const engine = fileContent.toString().split("\n");

let sum = 0;
const symbolRegex = /[^\d.]/; // Regex to match any symbol that is not a number or a period

// Function to check if the given coordinates are within the grid bounds
function isInBounds(x, y) {
  return x >= 0 && x < engine.length && y >= 0 && y < engine[x].length;
}

// Function to add the number to the sum if it's not already visited
function addNumberIfValid(x, y) {
  if (isInBounds(x, y) && /\d/.test(engine[x][y])) {
    // Find the start of the number
    while (y > 0 && /\d/.test(engine[x][y - 1])) {
      y--;
    }

    let numberStr = "";
    let cellIndex;

    // Extract the full number starting from this digit
    while (y < engine[x].length && /\d/.test(engine[x][y])) {
      cellIndex = `${x},${y}`;
      if (visited.has(cellIndex)) {
        return; // If we have already visited this number, return immediately
      }
      numberStr += engine[x][y];
      visited.add(cellIndex); // Mark this cell as visited
      y++;
    }

    console.log(numberStr);

    sum += parseInt(numberStr, 10);
  }
}

// Set to keep track of visited cells with part numbers
const visited = new Set();

// Iterate through each cell in the grid to find symbols
for (let x = 0; x < engine.length; x++) {
  for (let y = 0; y < engine[x].length; y++) {
    const cell = engine[x][y];
    if (symbolRegex.test(cell)) {
      // Check all adjacent cells for numbers
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // Skip the current cell with the symbol
          const newX = x + i;
          const newY = y + j;
          addNumberIfValid(newX, newY);
        }
      }
    }
  }
}

console.log(sum); // Output the sum of the part numbers
