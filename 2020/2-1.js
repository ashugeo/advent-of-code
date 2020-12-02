const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    // console.log(data);
    
    let valid = 0;

    for (const pass of data) {
        const [min, max] = pass.split(' ')[0].split('-');
        const letter = pass.split(' ')[1].split(':')[0];
        const string = pass.split(': ')[1];

        // console.log(min, max, letter, string);

        const count = string.split('').filter(d => d === letter).length;
        if (count >= min && count <= max) valid += 1;        
    }

    console.log(valid);
});