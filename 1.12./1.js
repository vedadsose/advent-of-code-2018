/**
 * https://adventofcode.com/2018/day/1
 */

const solution = changes =>
  changes.reduce((result, change) => eval(result + change), 0);

console.log(solution(["+1", "+1", "+1"]), "=>", 3);
console.log(solution(["+1", "+1", "-2"]), "=>", 0);
console.log(solution(["-1", "-2", "-3"]), "=>", 6);
