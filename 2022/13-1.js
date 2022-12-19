const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const pairs = data.split('\n\n').map((d) => d.split('\n'));

  const string = (arr) => `[${arr}]`;

  const compare = (a, b, pad) => {
    const evala = eval(a);
    const evalb = eval(b);

    console.log(
      `${pad}- Compare ${a.length === 1 ? string(a) : a} vs ${b.length === 1 ? string(b) : b}`
    );

    if (typeof evala === 'object' && typeof evalb === 'object') {
      // List

      for (let i = 0; i < Math.max(evala.length, evalb.length); i += 1) {
        if (evala[i] === undefined) {
          console.log(`${pad}  - Left side ran out of items, so inputs are in the right order`);
          return true;
        }

        if (evalb[i] === undefined) {
          console.log(
            `${pad}  - Right side ran out of items, so inputs are NOT in the right order`
          );
          return false;
        }

        const stop = compare(evala[i], evalb[i], `${pad}  `);
        if (typeof stop === 'boolean') return stop;
      }
    } else if (typeof evala === 'number' && typeof evalb === 'number') {
      // Numbers

      if (evala < evalb) {
        console.log(`${pad}  - Left side is smaller, so inputs are in the right order`);
        return true;
      } else if (evala > evalb) {
        console.log(`${pad}  - Right side is smaller, so inputs are NOT in the right order`);
        return false;
      }
    } else if (
      (typeof evala === 'number' && typeof evalb === 'object') ||
      (typeof evala === 'object' && typeof evalb === 'number')
    ) {
      // Mixed
      if (typeof evala === 'number') {
        console.log(`${pad}  - Mixed types; convert left to ${string(evala)} and retry comparison`);
        const stop = compare(string(evala), evalb, `${pad}  `);
        if (typeof stop === 'boolean') return stop;
      } else if (typeof evalb === 'number') {
        console.log(
          `${pad}  - Mixed types; convert right to ${string(evalb)} and retry comparison`
        );
        const stop = compare(evala, string(evalb), `${pad}  `);
        if (typeof stop === 'boolean') return stop;
      }
    }
  };

  let sum = 0;
  for (const [i, [a, b]] of pairs.entries()) {
    console.log(`\n== Pair ${i + 1} == `);

    const res = compare(a, b, '');
    if (res) sum += i + 1;
  }

  console.log(sum);
  // 6534 too high
});
