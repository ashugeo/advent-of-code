const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    // console.log(data);
    
    let valid = 0;

    for (const pass of data) {
        const [first, second] = pass.split(' ')[0].split('-').map(d => parseInt(d));
        const letter = pass.split(' ')[1].split(':')[0];
        const string = pass.split(': ')[1];

        // console.log(min, max, letter, string);

        if ((string.split('')[first - 1] === letter) ^ (string.split('')[second - 1] === letter)) valid += 1;
    }

    console.log(valid);
});