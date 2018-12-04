/**
 * https://adventofcode.com/2018/day/4
 */

const range = (start, end) =>
  new Array(end - start).fill(0).map((_, i) => start + i);

const flatMap = (a, cb) => [].concat(...a.map(cb));

const findMostFrequent = hours => {
  let mostFrequent = [];
  let counts = {};
  let compare = 0;

  for (var i = 0, len = hours.length; i < len; i++) {
    var hour = hours[i];

    if (counts[hour] === undefined) {
      counts[hour] = 1;
    } else {
      counts[hour] = counts[hour] + 1;
    }
    if (counts[hour] > compare) {
      compare = counts[hour];
      mostFrequent = hours[i];
    }
  }
  return mostFrequent;
};

const solution = events => {
  const sleeper = events
    .map(event => {
      const [_, date, text] = event.match(
        /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (.+)/i
      );
      return { date: new Date(date), text };
    })
    .sort((a, b) => a.date - b.date)
    .reduce(
      (acc, { date, text }) => {
        // Shift start
        const shift = text.match(/Guard #(\d+)/i);
        if (shift) {
          const id = parseInt(shift[1]);

          acc.guard = acc.guards.find(g => g.id === id);
          if (!acc.guard) {
            acc.guard = {
              id,
              total: 0,
              sleeps: []
            };
            acc.guards.push(acc.guard);
          }
        }

        // falls asleep
        if (text === "falls asleep") {
          acc.guard.sleeps.push({
            from: new Date(date).getMinutes(),
            to: null
          });
        }

        // wakes up
        if (text === "wakes up") {
          const lastSleep = acc.guard.sleeps[acc.guard.sleeps.length - 1];
          lastSleep.to = new Date(date).getMinutes();
          acc.guard.total += lastSleep.to - lastSleep.from;
        }

        return {
          guard: acc.guard,
          guards: acc.guards
        };
      },
      { guard: null, guards: [] }
    )
    .guards.sort((a, b) => b.total - a.total)[0];

  return (
    findMostFrequent(
      flatMap(sleeper.sleeps, (sleep, i, arr) =>
        flatMap(arr.slice(i + 1), compare =>
          range(sleep.from, sleep.to)
            .concat(range(compare.from, compare.to))
            .filter((value, index, self) => self.indexOf(value) !== index)
        )
      )
    ) * parseInt(sleeper.id)
  );
};

console.log(
  solution(
    `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`.split("\n")
  ),
  "=>",
  240
);
