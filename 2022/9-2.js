const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const moves = data
    .split('\n')
    .map((d) => ({ to: d.split(' ')[0], by: parseInt(d.split(' ')[1]) }));

  const knots = new Array(10).fill(0).map((_) => ({ x: 0, y: 0 }));

  const visited = [];

  for (const move of moves) {
    const { to, by } = move;

    // console.log(move);

    for (let i = 0; i < by; i += 1) {
      if (to === 'U') knots[0].y -= 1;
      else if (to === 'R') knots[0].x += 1;
      else if (to === 'D') knots[0].y += 1;
      else if (to === 'L') knots[0].x -= 1;

      for (let k = 1; k < knots.length; k += 1) {
        const head = knots[k - 1];
        const tail = knots[k];

        const distX = head.x - tail.x;
        const distY = head.y - tail.y;

        if (
          (distX === -2 && distY === -1) ||
          (distX === -1 && distY === -2) ||
          (distX === -2 && distY === -2)
        ) {
          tail.x -= 1;
          tail.y -= 1;
        } else if (
          (distX === 1 && distY === -2) ||
          (distX === 2 && distY === -1) ||
          (distX === 2 && distY === -2)
        ) {
          tail.x += 1;
          tail.y -= 1;
        } else if (
          (distX === 2 && distY === 1) ||
          (distX === 1 && distY === 2) ||
          (distX === 2 && distY === 2)
        ) {
          tail.x += 1;
          tail.y += 1;
        } else if (
          (distX === -1 && distY === 2) ||
          (distX === -2 && distY === 1) ||
          (distX === -2 && distY === 2)
        ) {
          tail.x -= 1;
          tail.y += 1;
        } else if (distY === -2) tail.y -= 1;
        else if (distX === 2) tail.x += 1;
        else if (distY === 2) tail.y += 1;
        else if (distX === -2) tail.x -= 1;

        if (k === 9 && !visited.some((d) => d.x === tail.x && d.y === tail.y)) {
          visited.push({ x: tail.x, y: tail.y });
        }
      }

      // debug
      // console.log('---------------');

      for (let y = -4; y <= 0; y += 1) {
        line = [];
        for (let x = 0; x <= 5; x += 1) {
          const knot = knots.findIndex((d) => d.x === x && d.y === y);
          if (knot !== -1) line.push(knot === 0 ? 'H' : knot);
          else line.push('.');
        }
        // console.log(line.join(''));
      }
    }
  }

  // console.log(visited);
  console.log(visited.length);
  // 489 too low
  // 2396
});
