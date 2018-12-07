/**
 * https://adventofcode.com/2018/day/7#part2
 */

const solution = (lines, workersLength, offset) => {
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

  let workers = new Array(workersLength)
    .fill(0)
    .map(() => ({ busy: 0, workingOn: null }));

  let time = 0;
  while (true) {
    for (let i = 0; i < workers.length; i++) {
      if (workers[i].busy > 1) {
        workers[i].busy--;
      } else {
        if (workers[i].workingOn) {
          workers[i].busy = 0;
          doneSteps.push(workers[i].workingOn);
        }
      }
    }

    const nextSteps = Object.keys(map)
      .concat(readySteps)
      .filter(
        step =>
          doneSteps.indexOf(step) < 0 &&
          (map[step] || []).filter(mapStep => doneSteps.indexOf(mapStep) < 0)
            .length === 0
      );

    if (
      nextSteps.length === 0 &&
      workers.filter(w => w.busy !== 0).length === 0
    )
      break;

    for (let i = 0; i < workers.length; i++) {
      if (workers[i].busy === 0) {
        const nextStep = nextSteps
          .filter(
            step => workers.filter(w => w.workingOn === step).length === 0
          )
          .sort()[0];

        if (nextStep) {
          workers[i] = {
            busy: nextStep.charCodeAt(0) - 64 + offset,
            workingOn: nextStep
          };
        } else {
          workers[i] = {
            busy: 0,
            workingOn: null
          };
        }
      }
    }

    time++;
  }

  return time;
};

console.log(
  solution(
    `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split("\n"),
    2,
    0
  ),
  "=>",
  15
);
