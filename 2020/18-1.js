const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let total = 0;
    for (let line of data) {
        while (isNaN(line)) {
            let pair = line.match(/\(\d+ [\+\*] \d+\)/)?.[0];
            if (!pair) pair = line.match(/\d+ [\+\*] \d+/)?.[0];
            
            line = line.replace(pair, `${eval(pair)}`);
        }

        total += parseInt(line);
    }

    console.log(total);
});