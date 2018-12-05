/**
 * https://adventofcode.com/2018/day/5#part2
 */

const getLength = input => {
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
  else return getLength(result);
};

const solution = input =>
  input
    .toLowerCase()
    .split("")
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(letter =>
      getLength(
        input.replace(
          new RegExp(`(${letter}|${letter.toUpperCase()})`, "g"),
          ""
        )
      )
    )
    .sort()[0];

console.log(solution("dabAcCaCBAcCcaDA"), " => ", 4);
