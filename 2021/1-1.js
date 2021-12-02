const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d).map(d => parseInt(d));

    let sum = 0;
    
    for (let i = 0; i < data.length; i += 1) {
        if (!data[i - 1]) continue;

        if (data[i] > data[i - 1]) sum += 1;
    }

    console.log(sum);
});
