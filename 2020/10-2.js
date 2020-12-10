const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => parseInt(d));
    
    data.unshift(0);
    
    data = data.sort((a, b) => a < b ? -1 : 1);
    // console.log(data);

    const diffs = [];

    for (const d of data) {
        let n = 0;
        if (data.includes(d + 1)) n += 1;
        if (data.includes(d + 2)) n += 1;
        if (data.includes(d + 3)) n += 1;
        diffs.push(n);
    }
    // console.log(diffs);

    let x = new Array(diffs.length).fill(1);

    for (let i = diffs.length - 1; i >= 0; i -= 1) {
        const d = diffs[i];

        if (d === 1) x[i] = x[i + 1];
        else if (d === 2) x[i] = x[i + 1] + x[i + 2];
        else if (d === 3) x[i] = x[i + 1] + x[i + 2] + x[i + 3];
    }

    console.log(x[0]);
});