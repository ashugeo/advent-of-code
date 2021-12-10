const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    let cells = [];

    for (const line of data) {
        // console.log(line);
        const [start, end] = line.split(' -> ');
        let [x1, y1] = start.split(',').map(d => parseInt(d));
        let [x2, y2] = end.split(',').map(d => parseInt(d));

        const diagonal = Math.abs(x1 - x2) === Math.abs(y1 - y2);

        if (x1 === x2 || y1 === y2) {
            [x1, x2] = [x1, x2].sort((a, b) => a - b);
            [y1, y2] = [y1, y2].sort((a, b) => a - b);

            for (let y = y1; y <= y2; y++) {
                for (let x = x1; x <= x2; x++) {
                    if (!cells[y]) cells[y] = [];
                    if (!cells[y][x]) cells[y][x] = 1;
                    else cells[y][x] += 1;
                }
            }
        } else if (diagonal) {
            // console.log({x1, y1, x2, y2});
            // console.log(x1, y1, '->', x2, y2);
            for (let i = 0; i <= Math.abs(x1 - x2); i += 1) {
                const distX = Math.sign(x1 - x2) * -i;
                const distY = Math.sign(y1 - y2) * -i;

                // console.log(x1 + distX, y1 + distY);

                if (!cells[y1 + distY]) cells[y1 + distY] = [];
                if (!cells[y1 + distY][x1 + distX]) cells[y1 + distY][x1 + distX] = 1;
                else cells[y1 + distY][x1 + distX] += 1;
            }
        }
    }

    const overlaps = cells.flat().filter(d => d > 1).length;
    console.log(overlaps);
});
