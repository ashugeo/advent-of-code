const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split(',').map(d => parseInt(d));
    // console.log(data);

    const x = 30000000;

    let n;
    let last;
    const numbers = {};

    for (let i = 0; i < x; i += 1) {
        n = data[i];

        if (!n) {
            if (numbers[last] && numbers[last].length > 1) n = numbers[last][numbers[last].length - 1] - numbers[last][numbers[last].length - 2];
            else n = 0;
        }

        if (!numbers[n]) numbers[n] = [];
        numbers[n].push(i);

        last = n;

        if (i % 100000 === 0) console.log(i / x);
    }

    console.log(n);
});