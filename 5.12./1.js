/**
 * https://adventofcode.com/2018/day/5
 */

const solution = input => {
  let result = [];
  for (let i = 0; i < input.length; i++) {
    if (
      i < input.length - 1 &&
      Math.abs(input[i].charCodeAt(0) - input[i + 1].charCodeAt(0)) === 32
    ) {
      i++;
    } else {
      result.push(input[i]);
    }
  }

  result = result.join("");
  if (result === input) return result.length;
  else return solution(result);
};

console.log(solution("dabAcCaCBAcCcaDA"), " => ", 10);
