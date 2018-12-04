/**
 * https://adventofcode.com/2018/day/4#part2
 */

const range = (start, end) =>
  new Array(end - start).fill(0).map((_, i) => start + i);

const solution = events =>
  events
    .map(event => {
      const [_, date, text] = event.match(
        /\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2})\] (.+)/i
      );
      return { date: new Date(date), text };
    })
    .sort((a, b) => a.date - b.date)
    .reduce(
      (acc, { date, text }) => {
        const shift = text.match(/Guard #(\d+)/i);
        if (shift) {
          const id = parseInt(shift[1]);

          acc.guard = acc.guards.find(g => g.id === id);
          if (!acc.guard) {
            acc.guard = {
              id,
              sleeps: []
            };
            acc.guards.push(acc.guard);
          }
        }

        if (text === "falls asleep") {
          acc.guard.sleeps.push({
            from: new Date(date).getMinutes(),
            to: null
          });
        }

        if (text === "wakes up") {
          const lastSleep = acc.guard.sleeps[acc.guard.sleeps.length - 1];
          lastSleep.to = new Date(date).getMinutes();
        }

        return {
          guard: acc.guard,
          guards: acc.guards
        };
      },
      { guard: null, guards: [] }
    )
    .guards.map(({ id, sleeps }) => {
      let acc = {};
      let maxValue = 0;
      let maxMinute = null;

      for (let i = 0; i < sleeps.length; i++) {
        const sleepRange = range(sleeps[i].from, sleeps[i].to);
        for (let y = 0; y < sleepRange.length; y++) {
          const hour = sleepRange[y];
          acc[hour] = (acc[hour] || 0) + 1;
          if (acc[hour] > maxValue) {
            maxValue = acc[hour];
            maxMinute = hour;
          }
        }
      }

      return {
        id,
        max: maxValue,
        minute: maxMinute,
        sum: id * maxMinute
      };
    })
    .sort((a, b) => b.max - a.max)[0].sum;

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
  4455
);
