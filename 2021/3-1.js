const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    console.log(data);

    let gamma = '';

    for (let i = 0; i < data[0].length; i++) {
        let sum = 0;
        for (const line of data) {
            if (line[i] === '1') sum += 1;
        }
        console.log(sum);

        if (sum > data.length / 2) gamma += '1';
        else gamma += '0';
    }

    console.log(gamma);
    const epsilon = gamma.split('').map(d => d === '0' ? '1' : '0').join('');
    console.log(epsilon);

    console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
});
