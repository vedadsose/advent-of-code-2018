/**
 * https://adventofcode.com/2018/day/1#part2
 * TODO: Improve performance
 */

const solution = changes => {
  let total = 0;
  let frequencies = [0];

  while (true) {
    for (let i = 0; i < changes.length; i++) {
      total = eval(total + changes[i]);
      if (frequencies.indexOf(total) >= 0) return total;
      else frequencies.push(total);
    }
  }
};

console.log(solution(["+1", "-1"]), "=>", 0);
console.log(solution(["+3", "+3", "+4", "-2", "-4"]), "=>", 10);
console.log(solution(["-6", "+3", "+8", "+5", "-6"]), "=>", 5);
console.log(solution(["+7", "+7", "-2", "-7", "-4"]), "=>", 14);
