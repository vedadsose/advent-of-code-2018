/**
 * https://adventofcode.com/2018/day/2
 */

const solution = ids => {
  const [twos, threes] = ids.reduce(
    (acc, id) => {
      const occurences = Object.values(
        id.split("").reduce(
          (appearances, letter) => ({
            ...appearances,
            [letter]: (appearances[letter] || 0) + 1
          }),
          {}
        )
      );

      return [
        acc[0] + (occurences.indexOf(2) >= 0 ? 1 : 0),
        acc[1] + (occurences.indexOf(3) >= 0 ? 1 : 0)
      ];
    },
    [0, 0]
  );

  return twos * threes;
};

console.log(
  solution([
    "abcdef",
    "bababc",
    "abbcde",
    "abcccd",
    "aabcdd",
    "abcdee",
    "ababab"
  ]),
  "=>",
  12
);
