/**
 * https://adventofcode.com/2018/day/10
 */

const findGroup = (dots, dot) => {
  dot.used = true;

  const foundDots = [
    // top
    dots.find(d => d.x === dot.x - 1 && d.y === dot.y - 1),
    dots.find(d => d.x === dot.x && d.y === dot.y - 1),
    dots.find(d => d.x === dot.x + 1 && d.y === dot.y - 1),
    // middle
    dots.find(d => d.x === dot.x - 1 && d.y === dot.y),
    dots.find(d => d.x === dot.x + 1 && d.y === dot.y),
    // bottom
    dots.find(d => d.x === dot.x - 1 && d.y === dot.y + 1),
    dots.find(d => d.x === dot.x && d.y === dot.y + 1),
    dots.find(d => d.x === dot.x + 1 && d.y === dot.y + 1)
  ]
    .filter(d => !!d && !d.used)
    .map(d => {
      return findGroup(dots, d);
    });

  return [].concat.apply([], foundDots.concat(dots.indexOf(dot)));
};

const draw = dots => {
  let minX = null;
  let minY = null;
  let maxX = null;
  let maxY = null;
  for (let i = 0; i < dots.length; i++) {
    if (!minX || dots[i].x < minX) minX = dots[i].x;
    if (!minY || dots[i].y < minY) minY = dots[i].y;
    if (!maxX || dots[i].x > maxX) maxX = dots[i].x;
    if (!maxY || dots[i].y > maxY) maxY = dots[i].y;
  }

  for (let y = minY - 1; y <= maxY; y++) {
    let row = "";
    for (let x = minX - 1; x <= maxX; x++) {
      const dot = dots.find(d => d.x === x && d.y === y);
      row += dot ? "#" : ".";
    }
    console.log(row);
  }
  console.log();
};

const findLetters = (dots, iOrg) => {
  const groups = [];
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];
    if (dot.used) continue;
    const group = findGroup(dots, dot);
    if (group.length > 5) groups.push(group);
  }

  if (groups.length > 0) {
    console.log("------");
    const sortedGroups = groups.sort((a, b) => {
      return a[0].x - b[0].x;
    });

    for (let i = 0; i < sortedGroups.length; i++) {
      let tempDots = [];
      for (let n = 0; n < sortedGroups[i].length; n++) {
        tempDots.push(dots[sortedGroups[i][n]]);
      }
      console.log(iOrg, tempDots[0].x, tempDots[0].y);
      draw(tempDots);
    }
  }
};

const solution = positions => {
  let dots = positions.map(p => {
    const [x, y, vx, vy] = p.match(/-?\d+/g);
    return {
      x: +x,
      y: +y,
      vx: +vx,
      vy: +vy
    };
  });

  findLetters(dots);

  for (let i = 0; i < 100000; i++) {
    dots = dots.map(dot => ({
      ...dot,
      x: dot.x + dot.vx,
      y: dot.y + dot.vy,
      used: false
    }));
    findLetters(dots, i);
  }
};

console.log(
  solution(
    `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`.split("\n")
  )
);
