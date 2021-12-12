const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.trim().split('\n');

    let sums = [];

    const points = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    };

    for (const line of data) {
        // console.log(line);

        let str = '';
        let valid = true;

        for (const char of line) {
            // console.log(str, char);

            if (!str) {
                str += char;
                continue;
            }

            if (
                (str[str.length - 1] === '(' && char === ')') ||
                (str[str.length - 1] === '[' && char === ']') ||
                (str[str.length - 1] === '{' && char === '}') ||
                (str[str.length - 1] === '<' && char === '>')
            ) {
                str = str.slice(0, -1);
                continue;
            }

            if ([')', ']', '}', '>'].includes(char)) {
                // console.log(`Error on ${char}`);

                valid = false;
                break;
            }

            str += char;
        }

        if (valid) {
            console.log('---');
            console.log(line);
            console.log(str);
            const reverse = str.split('').reverse();

            let sum = 0;

            for (const char of reverse) {
                sum *= 5;
                sum += points[char];
            }

            sums.push(sum);
        }
    }

    sums = sums.sort((a, b) => a - b);

    console.log(sums);
    console.log(sums[(sums.length - 1) / 2]);
});
