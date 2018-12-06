/**
 * https://adventofcode.com/2018/day/6#part2
 */

const distanceBetween = (x1, y1, x2, y2) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const solution = (coordinates, maxSafety) => {
  const width = coordinates.map(i => i[0]).sort((a, b) => b - a)[0];
  const height = coordinates.map(i => i[1]).sort((a, b) => b - a)[0];
  let region = 0;

  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      const distances = coordinates.reduce(
        (total, c) => total + distanceBetween(x, y, c[0], c[1]),
        0
      );

      if (distances < maxSafety) region++;
    }
  }

  return region;
};

console.log(
  solution([[1, 1], [1, 6], [8, 3], [3, 4], [5, 5], [8, 9]], 32),
  "=>",
  16
);
