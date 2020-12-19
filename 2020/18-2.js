const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let total = 0;
    for (let line of data) {
        console.log('---');
        console.log(line);
        while (isNaN(line)) {
            let pair = line.match(/\(\d+ \+ \d+\)/)?.[0];
            if (!pair) pair = line.match(/\d+ \+ \d+/)?.[0];
            if (!pair) pair = line.match(/\d+ \+ \([\d\* ]+\)/)?.[0];
            if (!pair) pair = line.match(/\([\d\* ]+\) \+ \d+/)?.[0];
            if (!pair) pair = line.match(/\([\d\* ]*(\(\d+ \* \d+\))[\d\* ]*\)/)?.[0];
            if (!pair) pair = line.match(/\d+ \* \d+/)?.[0];
            if (!pair) pair = line.match(/\(\d+\)/)?.[0];

            console.log(pair);
            line = line.replace(pair, `${eval(pair)}`);
            console.log(line);
        }

        console.log(line);
        total += parseInt(line);
    }

    console.log(total);
});

//  27078994731993
//  98621258158412
// 237940609397646
// 240019893422125
// 240450807308313