const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    data = data.trim().split('\n').map(d => d.split('').map(e => parseInt(e)));

    const steps = 100;

    let flashes = 0;

    const light = (_x, _y) => {

        map[_y][_x] = '.';

        for (let j = -1; j <= 1; j += 1) {
            for (let i = -1; i <= 1; i += 1) {
                if (j === 0 && i === 0) continue;

                const x = _x + i;
                const y = _y + j;

                if (!map[y]?.[x] || map[y][x] === '.') continue;

                map[y][x] += 1;
                if (map[y][x] > 9) light(x, y);

                // console.log({x, y}, map[y][x]);
            }
        }
    }

    for (step = 0; step < steps; step += 1) {
        map = [...data];

        // console.log(`\nAfter step ${step}:\n`);
        // for (const line of map) console.log(line.join(''));
        
        for (let y = 0; y < map.length; y += 1) {
            for (let x = 0; x < map[0].length; x += 1) {
                map[y][x] += 1;
            }
        }

        for (let y = 0; y < map.length; y += 1) {
            for (let x = 0; x < map[0].length; x += 1) {
                if (map[y][x] > 9) light(x, y);
            }
        }

        for (let y = 0; y < map.length; y += 1) {
            for (let x = 0; x < map[0].length; x += 1) {
                if (map[y][x] > 9 || map[y][x] === '.') {
                    map[y][x] = 0;
                    flashes += 1;
                }
            }
        }
    }

    console.log(flashes);
});
