/**
 * https://adventofcode.com/2018/day/9
 */

const solution = (playersSize, marblesSize) => {
  let scores = new Array(playersSize).fill(0);

  let currentMarble = { value: 0 };
  currentMarble.prev = currentMarble;
  currentMarble.next = currentMarble;

  for (let marble = 0; marble < marblesSize; marble++) {
    const currentPlayer = marble % playersSize;

    if (marble % 23 === 0) {
      let target = currentMarble;
      for (let b = 0; b < 7; b++) {
        target = target.prev;
      }

      scores[currentPlayer] += marble + target.value;
      target.next.prev = target.prev;
      target.prev.next = target.next;
      currentMarble = target.next;
    } else {
      let target = currentMarble.next;
      let newMarble = { value: marble, prev: target, next: target.next };
      target.next.prev = newMarble;
      target.next = newMarble;
      currentMarble = newMarble;
    }
  }

  return scores.sort((a, b) => b - a)[0];
};

console.log(solution(10, 1618), " => ", 8317);
console.log(solution(13, 7999), " => ", 146373);
console.log(solution(17, 1104), " => ", 2764);
console.log(solution(21, 6111), " => ", 54718);
console.log(solution(30, 5807), " => ", 37305);

console.log(solution(479, 7103500), " => ", 3020072891);
