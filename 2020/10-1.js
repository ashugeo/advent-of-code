const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => parseInt(d));
    // console.log(data);

    const highest = Math.max(...data) + 3;
    data.push(highest);

    data = data.sort((a, b) => a < b ? -1 : 1);

    const diffs = { '1': 0, '2': 0, '3': 0 };

    for (let i = 0; i <= highest; i += 1) {
        const lowest = data[0];
        data.shift();

        if (lowest - i === 1) diffs['1'] += 1;
        else if (lowest - i === 2) diffs['2'] += 1;
        else if (lowest - i === 3) diffs['3'] += 1;

        i = lowest - 1;
    }

    // console.log(diffs);
    console.log(diffs['1'] * diffs['3']);
});