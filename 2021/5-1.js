const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    let cells = [];

    for (const line of data) {
        const [start, end] = line.split(' -> ');
        let [x1, y1] = start.split(',').map(d => parseInt(d));
        let [x2, y2] = end.split(',').map(d => parseInt(d));

        [x1, x2] = [x1, x2].sort();
        [y1, y2] = [y1, y2].sort();

        if (!(x1 === x2 || y1 === y2)) continue;

        // console.log(x1, x2, y1, y2);

        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                if (!cells[y]) cells[y] = [];
                if (!cells[y][x]) cells[y][x] = 1;
                else cells[y][x] += 1;
            }
        }
    }

    const overlaps = cells.flat().filter(d => d > 1).length;
    console.log(overlaps);
});
