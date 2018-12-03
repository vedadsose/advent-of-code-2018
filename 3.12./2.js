/**
 * https://adventofcode.com/2018/day/3#part2
 */

const valueInRange = (value, min, max) => value <= max && value >= min;

const doIntersect = (area1, area2) =>
  (valueInRange(area1.x, area2.x, area2.x + area2.w - 1) ||
    valueInRange(area2.x, area1.x, area1.x + area1.w - 1)) &&
  (valueInRange(area1.y, area2.y, area2.y + area2.h - 1) ||
    valueInRange(area2.y, area1.y, area1.y + area1.h - 1));

const solution = claims => {
  return claims
    .map(claim => {
      const results = claim.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/i);
      return {
        id: parseInt(results[1]),
        x: parseInt(results[2]),
        y: parseInt(results[3]),
        w: parseInt(results[4]),
        h: parseInt(results[5]),
        intersections: 0
      };
    })
    .map((claim, _, arr) => {
      return {
        ...claim,
        intersections: arr.filter(
          claim2 => claim.id !== claim2.id && doIntersect(claim, claim2)
        ).length
      };
    })
    .find(claim => claim.intersections === 0).id;
};

console.log(
  solution(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"]),
  "=>",
  3
);
