const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n').map(d => parseInt(d));
    
    for (let i = 0; i < data.length - 2; i += 1) {
        for (let j = i + 1; j < data.length - 1; j += 1) {
            for (let k = j + 1; k < data.length; k += 1) {
                if (data[i] + data[j] + data[k] === 2020) console.log(data[i] * data[j] * data[k]);
           }
        }
    }
});