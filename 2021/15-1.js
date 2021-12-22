const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    data = data.trim().split('\n');

    let map = [];

    for (let y = 0; y < data.length; y += 1) {
        if (!map[y]) map.push([]);

        for (let x = 0; x < data[0].length; x += 1) {
            const cell = parseInt(data[y][x]);

            const left = map[y][x - 1] || 0;
            const top = map[y - 1]?.[x] || 0;

            let min = Math.min(...[left, top].filter(d => d > 0));
            if (!isFinite(min)) min = 0;

            map[y][x] = cell + min;
        }
    }

    console.log(map[map.length - 1][map[0].length - 1] - map[0][0]);
});
