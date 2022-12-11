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

  let x = 1;
  let cycle = 0;

  let out = '';

  while (cycle < lines.length) {
    // console.log('\n');
    const line = lines[cycle];
    cycle += 1;

    // const c = cycle.toString().padStart(2, ' ');

    // console.log(`Start cycle ${c}`);
    // console.log(`During cycle ${c}: CRT draws pixel in positon ${cycle - 1}`);

    if (Math.abs(((cycle - 1) % 40) - x) <= 1) out += '█';
    else out += ' ';

    // console.log(`Current CRT row: ${out}`);

    if (line) {
      const val = parseInt(line.split(' ')[1]);
      x += val;

      // console.log(`End of cycle ${c}: finish executing addx ${val} (Register X is now ${x})`);
    }

    // console.log('end', { cycle, x });
  }

  console.log(out.match(/.{40}/g));
});
