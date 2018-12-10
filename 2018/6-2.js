const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    let coords = data.split('\n');
    coords.pop();

    let points = [];
    let id = 0;
    for (let coord of coords) {
        points.push({
            id,
            x: parseInt(coord.split(', ')[0]),
            y: parseInt(coord.split(', ')[1])
        });
        id += 1;
    }

    const maxX = Math.max.apply(Math, points.map((p) => { return p.x; }));
    const maxY = Math.max.apply(Math, points.map((p) => { return p.y; }));

    let board = [];
    for (let y = 0; y <= maxY; y += 1) {
        board[y] = [];
        for (let x = 0; x <= maxX; x += 1) {
            board[y][x] = { id: -1 };
        }
    }

    for (let point of points) {
        board[point.y][point.x] = { id: point.id };
    }

    let count = 0;

    for (let y = 0; y <= maxY; y += 1) {
        console.log(Math.floor(y / maxY * 100) + '%');
        for (let x = 0; x <= maxX; x += 1) {
            const cell = board[x][y];

            let total = 0;

            for (let j = 0; j <= maxY; j += 1) {
                for (let i = 0; i <= maxX; i += 1) {
                    const point = board[j][i];
                    if (point.id === -1) continue;

                    let dist = Math.abs(y - j) + Math.abs(x - i);
                    total += dist;
                }
            }

            if (total < 10000) count += 1;
        }
    }

    console.log(count);
});
