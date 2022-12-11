const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const lines = data
    .split('\n')
    .map((line) => {
      if (line === 'noop') {
        return null;
      } else if (line.startsWith('addx')) {
        return [null, line];
      }
    })
    .flat();

  // console.log(lines);

  let x = 1;
  let cycle = 0;

  let sum = 0;

  while (cycle < lines.length) {
    // console.log('---');
    const line = lines[cycle];
    cycle += 1;

    if ([20, 60, 100, 140, 180, 220].includes(cycle)) {
      console.log('during', { cycle, x });
      sum += cycle * x;
    }

    x += line ? parseInt(line.split(' ')[1]) : 0;
  }

  console.log(sum);
});
