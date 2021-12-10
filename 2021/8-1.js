const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    // console.log(data);
    let unique = 0;

    for (const line of data) {
        const [patterns, output] = line.split(' | ');
        console.log(output);
        const digits = output.split(' ');

        console.log(digits);

        unique += digits.filter(d => [2, 3, 4, 7].includes(d.length)).length;
    }
    console.log(unique);
});
