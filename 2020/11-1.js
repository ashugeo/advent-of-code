const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => d.split(''));
    // console.log(data);

    const layouts = [];

    layouts.push(data);

    const getNeighbors = (layout, x, y) => {
        let neighbors = 0;
        for (let j = y - 1; j <= y + 1; j += 1) {
            for (let i = x - 1; i <= x + 1; i += 1) {
                if (i < 0 || j < 0 || i >= layout[0].length || j >= layout.length) continue;
                if (i === x && j === y) continue;
                if (layout[j][i] === '#') neighbors += 1;
            }
        }
        return neighbors;
    }

    while (true) {
        const layout = [];
        const prev = layouts[layouts.length - 1];
    
        for (let y = 0; y < prev.length; y += 1) {
            layout[y] = [];
    
            for (let x = 0; x < prev[0].length; x += 1) {
                const neighbors = getNeighbors(prev, x, y);
    
                if (prev[y][x] === 'L' && neighbors === 0) layout[y][x] = '#';
                else if (prev[y][x] === '#' && neighbors >= 4) layout[y][x] = 'L';
                else layout[y][x] = prev[y][x];
            }
        }

        const prevFlat = prev.flat(2).join('');
        const layoutFlat = layout.flat(2).join('');
        if (layoutFlat === prevFlat) {
            console.log(layoutFlat.match(/\#/g).length);
            break;
        }

        layouts.push(layout);
    }
});