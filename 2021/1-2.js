const fs = require('fs');

fs.readFile('./data.txt', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d).map(d => parseInt(d));

    let sum = 0;
    
    for (let i = 0; i < data.length; i += 1) {
        if (!(
            data[i - 1] &&
            data[i - 2] &&
            data[i - 3]
        )) continue;

        const prev = data[i - 1] + data[i - 2] + data[i - 3];

        const curr = data[i] + data[i - 1] + data[i - 2];

        if (curr > prev) sum += 1;
    }

    console.log(sum);
});
