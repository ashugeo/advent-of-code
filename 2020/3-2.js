const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    // console.log(data);

    const slopes = [
        { x: 1, y: 1 },
        { x: 3, y: 1 },
        { x: 5, y: 1 },
        { x: 7, y: 1 },
        { x: 1, y: 2 }
    ];

    const allTrees = [];

    for (const slope of slopes) {
        let x = 0;
        let y = 0;

        let trees = 0;

        while(y < data.length) {
            // console.log(x, y);
            const cell = data[y][x % data[y].length];
            if (cell === '#') trees += 1;
            // console.log(cell);
            x += slope.x;
            y += slope.y;
        }
    
        console.log(trees);
        allTrees.push(trees);
    }

    // console.log(allTrees);
    const mult = allTrees.reduce((acc, curr) => acc * curr, 1);
    console.log(mult);
});