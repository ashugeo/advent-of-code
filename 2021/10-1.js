const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n');

    let total = 0;
    const points = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };

    for (const line of data) {
        // console.log(line);

        let str = '';

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
                console.log(`Error on ${char}`);

                total += points[char];

                break;
            }

            str += char;
        }
    }
    
    console.log(total);
});
