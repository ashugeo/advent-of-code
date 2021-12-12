const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    // console.log(data);

    const marked = [];

    let sum = 0;

    const findNeighbours = (x, y) => {
        if (marked[y]?.[x]) return false;

        if (data[y] === undefined) return false;
        if (data[y][x] === undefined) return false;

        if (!marked[y]) marked[y] = [];
        marked[y][x] = true;

        const cell = parseInt(data[y][x]);

        // console.log({x, y}, cell);

        if (cell === 9) return false;

        sum += 1;
        
        findNeighbours(x - 1, y);
        findNeighbours(x + 1, y);
        findNeighbours(x, y - 1);
        findNeighbours(x, y + 1);

        return true;
    }

    let sums = [];

    for (let y = 0; y < data.length; y += 1) {
        for (let x = 0; x < data[0].length; x += 1) {
            sum = 0;
            findNeighbours(x, y);
            if (sum) sums.push(sum);
        }
    }

    // console.log(sums);
    const three = sums.sort((a, b) => b - a).slice(0, 3);
    console.log(three[0] * three[1] * three[2]);
});
