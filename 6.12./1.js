/**
 * https://adventofcode.com/2018/day/6
 */

const distanceBetween = (x1, y1, x2, y2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const solution = coordinates => {
  const width = coordinates.map(i => i[0]).sort((a, b) => b - a)[0];
  const height = coordinates.map(i => i[1]).sort((a, b) => b - a)[0];

  let matrix = [];
  let discarded = [];

  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      const distances = coordinates
        .map((c, index) => [index, distanceBetween(x, y, c[0], c[1])])
        .sort((a, b) => a[1] - b[1]);

      if ((x === 0 || y === 0) && discarded.indexOf(distances[0][0]) < 0)
        discarded.push(distances[0][0]);

      if (!matrix[x]) matrix[x] = [];
      matrix[x][y] =
        distances[0][1] !== distances[1][1] ? distances[0][0] : ".";
    }
  }

  const sizes = [];

  for (let i = 0; i < coordinates.length; i++) {
    if (discarded.indexOf(i) >= 0) continue;
    let size = 0;
    for (let x = 0; x <= width; x++) {
      for (let y = 0; y <= height; y++) {
        if (matrix[x][y] === i) size++;
      }
    }

    sizes.push(size);
  }

  return sizes.sort((a, b) => b - a)[0];
};

console.log(
  solution([[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]]),
  "=>",
  17
);
