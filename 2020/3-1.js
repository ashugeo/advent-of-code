const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    // console.log(data);

    let x = 0;
    let y = 0;

    let trees = 0;

    while(y < data.length) {
        // console.log(x, y);
        const cell = data[y][x % data[y].length];
        if (cell === '#') trees += 1;
        // console.log(cell);
        x += 3;
        y += 1;
    }

    console.log(trees);
});