const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const moves = data
    .split('\n')
    .map((d) => ({ to: d.split(' ')[0], by: parseInt(d.split(' ')[1]) }));

  let headX = 0;
  let headY = 0;

  let tailX = 0;
  let tailY = 0;

  const visited = [];

  for (const move of moves) {
    // console.log(move);
    const { to, by } = move;

    for (let i = 0; i < by; i += 1) {
      // console.log('---');
      if (to === 'U') headY -= 1;
      else if (to === 'R') headX += 1;
      else if (to === 'D') headY += 1;
      else if (to === 'L') headX -= 1;

      const distX = headX - tailX;
      const distY = headY - tailY;

      if ((distX === -2 && distY === -1) || (distX === -1 && distY === -2)) {
        tailX -= 1;
        tailY -= 1;
      } else if ((distX === 1 && distY === -2) || (distX === 2 && distY === -1)) {
        tailX += 1;
        tailY -= 1;
      } else if ((distX === 2 && distY === 1) || (distX === 1 && distY === 2)) {
        tailX += 1;
        tailY += 1;
      } else if ((distX === -1 && distY === 2) || (distX === -2 && distY === 1)) {
        tailX -= 1;
        tailY += 1;
      } else if (distY === -2) tailY -= 1;
      else if (distX === 2) tailX += 1;
      else if (distY === 2) tailY += 1;
      else if (distX === -2) tailX -= 1;

      // console.log({ headX, headY });
      // console.log({ tailX, tailY });

      if (!visited.some((d) => d.x === tailX && d.y === tailY)) {
        visited.push({ x: tailX, y: tailY });
      }
    }
  }

  console.log(visited.length);
});
