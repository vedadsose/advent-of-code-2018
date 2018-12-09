/**
 * https://adventofcode.com/2018/day/8
 */

const input = require("./input");

const solution = nums => {
  let firstNode = null;
  let currentNode = null;
  let i = 0;

  while (i < nums.length) {
    const newNode = {
      nodesSize: nums[i],
      metaSize: nums[i + 1],
      nodesDone: 0,
      nodes: [],
      parent: currentNode,
      metaValue: 0
    };

    if (currentNode) {
      currentNode.nodes.push(newNode);
    } else {
      currentNode = newNode;
      firstNode = currentNode;
    }

    if (newNode.nodesSize > 0) {
      currentNode = newNode;
      i += 2;
    } else {
      let total = 0;

      for (let m = 0; m < newNode.metaSize; m++) {
        total += nums[i + 2 + m];
      }

      newNode.metaValue = total;

      i += 2 + newNode.metaSize;

      let pparent = newNode.parent;
      while (pparent) {
        pparent.nodesDone++;
        if (pparent.nodesDone === pparent.nodesSize) {
          let sum = 0;
          const goTo = i + pparent.metaSize;
          while (i < goTo) {
            if (pparent.nodes[nums[i] - 1]) {
              sum += pparent.nodes[nums[i] - 1].metaValue;
            }
            i++;
          }
          pparent.metaValue = sum;

          pparent = pparent.parent;
          currentNode = pparent;
        } else {
          pparent = null;
        }
      }
    }
  }

  return firstNode.metaValue;
};

console.log(solution([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]));

console.log(solution(input.split(" ").map(i => parseInt(i))));
