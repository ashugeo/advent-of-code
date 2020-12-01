const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n').map(d => parseInt(d));
    
    for (let i = 0; i < data.length - 1; i += 1) {
        for (let j = i + 1; j < data.length; j += 1) {
            if (data[i] + data[j] === 2020) console.log(data[i] * data[j]);
        }
    }
});