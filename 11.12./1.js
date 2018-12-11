/**
 * https://adventofcode.com/2018/day/11
 */

const solution = serialNumber => {
  let matrix = [];
  for (let x = 1; x <= 300; x++) {
    for (let y = 1; y <= 300; y++) {
      if (!matrix[x]) matrix[x] = [];
      matrix[x][y] =
        Math.floor(((((x + 10) * y + serialNumber) * (x + 10)) % 1000) / 100) -
        5;
    }
  }

  let maxSum = 0;
  let maxCoordinates = [];
  for (let x = 1; x <= 298; x++) {
    for (let y = 1; y <= 298; y++) {
      let sum = 0;
      sum +=
        matrix[x][y] +
        matrix[x + 1][y] +
        matrix[x + 1][y + 2] +
        matrix[x + 2][y] +
        matrix[x][y + 1] +
        matrix[x + 2][y + 1] +
        matrix[x][y + 2] +
        matrix[x + 1][y + 1] +
        matrix[x + 2][y + 2];

      if (sum > maxSum) {
        maxSum = sum;
        maxCoordinates = [x, y];
      }
    }
  }

  return maxCoordinates;
};

console.log(solution(2694), " => [243, 38]");
