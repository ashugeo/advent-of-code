const fs = require('fs');

fs.readFile('./data.md', 'utf8', async (_, data) => {
  console.clear();
  // console.log(data);

  let date = Date.now();

  const minX = Math.min(...[...data.matchAll(/(\d+),/g)].map((d) => d[1]));
  const maxX = Math.max(...[...data.matchAll(/(\d+),/g)].map((d) => d[1]));

  // const minY = Math.min(...[...data.matchAll(/,(\d+)/g)].map((d) => d[1]));
  const minY = 0;
  const maxY = Math.max(...[...data.matchAll(/,(\d+)/g)].map((d) => d[1]));

  // console.log(minX, minY);
  // console.log(maxX, maxY);
  // console.log('');

  const rocks = [];

  for (const line of data.trim().split('\n')) {
    const points = line.split(' -> ');
    // console.log(points);

    for (let i = 0; i < points.length - 1; i += 1) {
      const [xA, yA] = points[i].split(',').map((d) => parseInt(d));
      const [xB, yB] = points[i + 1].split(',').map((d) => parseInt(d));

      if (xA === xB) {
        for (let y = Math.min(yA, yB); y <= Math.max(yA, yB); y += 1) {
          if (!rocks.includes(`${xA},${y}`)) rocks.push(`${xA},${y}`);
        }
      } else if (yA === yB) {
        for (let x = Math.min(xA, xB); x <= Math.max(xA, xB); x += 1) {
          if (!rocks.includes(`${x},${yA}`)) rocks.push(`${x},${yA}`);
        }
      }
    }
  }

  const sleep = () => {
    return new Promise((res) => {
      setTimeout(() => res(), 10);
    });
  };

  let t = 0;
  let canDrop = true;
  let sandX = 0;
  let sandY = 0;

  const drops = [];

  while (true) {
    const out = [];

    if (canDrop) {
      sandX = 500;
      sandY = 0;
      canDrop = false;
    }

    for (let y = minY; y <= maxY; y += 1) {
      line = `${y} `;
      for (let x = minX; x <= maxX; x += 1) {
        if (x === sandX && y === sandY) {
          line += 'o';
        } else if (y === 0 && x === 500) {
          line += '+';
        } else if (rocks.includes(`${x},${y}`)) line += 'X';
        else if (drops.includes(`${x},${y}`)) line += 'o';
        else line += ' ';
      }
      out.push(line);
    }

    if (rocks.includes(`${sandX},${sandY + 1}`) || drops.includes(`${sandX},${sandY + 1}`)) {
      // Can't go down, try left down
      if (
        rocks.includes(`${sandX - 1},${sandY + 1}`) ||
        drops.includes(`${sandX - 1},${sandY + 1}`)
      ) {
        // Can't go left down, try right down
        if (
          rocks.includes(`${sandX + 1},${sandY + 1}`) ||
          drops.includes(`${sandX + 1},${sandY + 1}`)
        ) {
          // Can't go right down, settle sand grain
          drops.push(`${sandX},${sandY}`);
          canDrop = true;
        } else {
          // Go right down
          sandX += 1;
          sandY += 1;
        }
      } else {
        // Go left down
        sandX -= 1;
        sandY += 1;
      }
    } else {
      // Go down
      sandY += 1;

      // Sand falls into abyss
      if (sandY >= maxY) {
        console.log(
          out
            .flat()
            .join('')
            .split('')
            .filter((d) => d === 'o').length
        );

        console.log(Date.now() - date);
        return;
      }
    }

    console.log(out.join('\n'));

    t += 1;
    // await sleep();
  }
});
