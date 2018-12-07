/**
 * https://adventofcode.com/2018/day/7
 */

const solution = lines => {
  const map = lines.reduce((acc, line) => {
    const [_, pre, next] = line.match(/Step ([A-Z]) .+ step ([A-Z])/);

    return {
      ...acc,
      [next]: acc[next] ? acc[next].concat(pre) : [pre]
    };
  }, {});

  const readySteps = lines
    .reduce((acc, line) => {
      const [_, pre, next] = line.match(/Step ([A-Z]) .+ step ([A-Z])/);
      return [...acc, pre, next];
    }, [])
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter(step => Object.keys(map).indexOf(step) < 0);

  let doneSteps = [];

  while (true) {
    const nextStep = Object.keys(map)
      .concat(readySteps)
      .filter(
        step =>
          doneSteps.indexOf(step) < 0 &&
          (map[step] || []).filter(mapStep => doneSteps.indexOf(mapStep) < 0)
            .length === 0
      )
      .sort()[0];

    if (!nextStep) break;

    doneSteps.push(nextStep);
  }

  return doneSteps.join("");
};

console.log(
  solution(
    `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split("\n")
  ),
  "=>",
  "CABDFE"
);
