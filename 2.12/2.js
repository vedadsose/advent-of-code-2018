/**
 * https://adventofcode.com/2018/day/2#part2
 */

const findCommonLetters = (word1, word2) => {
  return word1
    .split("")
    .filter((letter, index) => letter === word2[index])
    .join("");
};

const solution = ids => {
  const solutionLength = ids[0].length - 1;
  for (let i = 0; i < ids.length; i++) {
    for (let y = i + 1; y < ids.length; y++) {
      const similar = findCommonLetters(ids[i], ids[y]);
      if (similar.length === solutionLength) return similar;
    }
  }
};

console.log(
  solution(["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"]),
  "=> fgij"
);
