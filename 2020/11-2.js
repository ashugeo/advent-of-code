const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => d.split(''));
    // console.log(data);

    const layouts = [];

    layouts.push(data);

    const dirs = [];
    for (let j = -1; j <= 1; j += 1) {
        for (let i = -1; i <= 1; i += 1) {
            if (i === 0 && j === 0) continue;
            dirs.push([i, j]);
        }
    }

    const getNeighbors = (layout, x, y) => {
        let neighbors = 0;

        for (const dir of dirs) {
            const [i, j] = dir;
            let _i = i;
            let _j = j;

            if (x + _i < 0 || y + _j < 0 || x + _i >= data[0].length || y + _j >= data.length) continue;

            let cell = layout[y + _j][x + _i];
            if (!cell) continue;

            while (cell === '.') {
                _i += i;
                _j += j;

                if (x + _i < 0 || y + _j < 0 || x + _i >= data[0].length || y + _j >= data.length) break;
                cell = layout[y + _j][x + _i];
            }
            
            if (cell === '#') neighbors += 1;
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
                else if (prev[y][x] === '#' && neighbors >= 5) layout[y][x] = 'L';
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