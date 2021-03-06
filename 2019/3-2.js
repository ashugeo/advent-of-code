const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    // console.log(data);

    const cells = [{ x: 0, y: 0 }];

    const wires = data.split('\n').filter(w => w.length).map(w => w.split(','));

    let w = 0;
    for (const wire of wires) {
        let x = 0;
        let y = 0;
        let l = 0;

        for (const segment of wire) {
            const dir = segment[0];
            const length = parseInt(segment.slice(1));

            // console.log(dir);
            // console.log(length);

            for (let i = 0; i < length; i += 1) {
                l += 1;
                x += { 'R': 1, 'D': 0, 'L': -1, 'U': 0 }[dir];
                y += { 'R': 0, 'D': 1, 'L': 0, 'U': -1 }[dir];

                const cell = cells.find(c => c.x === x && c.y === y && !Object.keys(c.w).includes(w));
                if (cell) {
                    cell.w[w] = l;
                } else {
                    cells.push({ x, y, w: { [w]: l } });
                }
            }
        }

        w += 1;
    }

    const overlaps = cells.filter(c => c.w && Object.keys(c.w).length > 1);
    console.log(overlaps);

    let minDistance;

    for (const overlap of overlaps) {
        const distance = overlap.w['0'] + overlap.w['1'];
        if (!minDistance || distance < minDistance) minDistance = distance;
    }
    console.log({minDistance});
});
