/**
 * https://adventofcode.com/2018/day/8
 */

const input = require("./input");

const solution = nums => {
  let total = 0;
  let currentNode = null;
  let i = 0;

  while (i < nums.length) {
    const newNode = {
      nodesSize: nums[i],
      metaSize: nums[i + 1],
      nodesDone: 0,
      nodes: [],
      parent: currentNode
    };

    if (currentNode) {
      currentNode.nodes.push(newNode);
    } else {
      currentNode = newNode;
    }

    if (newNode.nodesSize > 0) {
      currentNode = newNode;
      i += 2;
    } else {
      let pparent = newNode.parent;
      let countTo = newNode.metaSize;
      while (pparent) {
        pparent.nodesDone++;
        if (pparent.nodesDone === pparent.nodesSize) {
          countTo += pparent.metaSize;
          pparent = pparent.parent;
          currentNode = pparent;
        } else {
          pparent = null;
        }
      }

      for (let m = 0; m < countTo; m++) {
        total += nums[i + 2 + m];
      }

      i += countTo + 2;
    }
  }

  return total;
};

console.log(solution([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]));

console.log(solution(input.split(" ").map(i => parseInt(i))));
