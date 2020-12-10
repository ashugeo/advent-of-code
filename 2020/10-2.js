const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => parseInt(d));
    
    const highest = Math.max(...data) + 3;
    data.push(highest);
    
    data = data.sort((a, b) => a < b ? -1 : 1);
    // console.log(data);

    let valid = 0;

    const findValid = (d, n) => {
        if (!data.includes(d + n)) return 0;

        if (d + n === highest) return 1;
        
        return findValid(d + n, 1) + findValid(d + n, 2) + findValid(d + n, 3);
    }

    valid += findValid(0, 1) + findValid(0, 2) + findValid(0, 3);

    console.log({valid});
});