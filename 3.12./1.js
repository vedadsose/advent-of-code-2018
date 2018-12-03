/**
 * https://adventofcode.com/2018/day/3
 */

const solution = claims => {
  let fabric = Array(1000)
    .fill()
    .map(() => Array(1000).fill(0));

  for (let i = 0; i < claims.length; i++) {
    const results = claims[i].match(/(\d+),(\d+): (\d+)x(\d+)/i);
    const x = parseInt(results[1]);
    const y = parseInt(results[2]);
    const w = parseInt(results[3]);
    const h = parseInt(results[4]);

    for (let n = x; n < x + w; n++) {
      for (let r = y; r < y + h; r++) {
        fabric[n][r]++;
      }
    }
  }

  return fabric.reduce(
    (acc, row) => acc + row.reduce((acc2, n) => acc2 + (n > 1 ? 1 : 0), 0),
    0
  );
};

console.log(
  solution(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"]),
  "=>",
  4
);
