/**
 * https://adventofcode.com/2018/day/11
 */

const solution = serialNumber => {
  let matrix = [];
  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      if (!matrix[x]) matrix[x] = [];
      matrix[x][y] =
        Math.floor(
          ((((x + 11) * (y + 1) + serialNumber) * (x + 11)) % 1000) / 100
        ) - 5;
    }
  }

  let max = 0;
  let maxCoordinates = [0, 0, 0];

  for (let x = 0; x < 300; x++) {
    for (let y = 0; y < 300; y++) {
      let localMax = null;
      let localMaxSize = 0;
      let sum;

      let size = 1;
      let maxSize = Math.min(300 - x, 300 - y);

      while (size < maxSize && (size < 6 || sum > matrix[x][y])) {
        size++;
        sum = gridSum(matrix, x, y, size);
        if (!localMax || sum > localMax) {
          localMax = sum;
          localMaxSize = size;
        }
      }
      if (localMax > max) {
        max = localMax;
        maxCoordinates = [x + 1, y + 1, localMaxSize];
      }
    }
  }

  return maxCoordinates.join(",");
};

function gridSum(points, x, y, size) {
  let sum = 0;
  for (let i = x; i < x + size; i++) {
    for (let j = y; j < y + size; j++) {
      sum += points[i][j];
    }
  }
  return sum;
}

console.log(solution(2694), " => 235,146,13");
