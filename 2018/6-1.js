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
            board[y][x] = '';
        }
    }

    for (let point of points) {
        board[point.y][point.x] = point.id;
    }

    for (let y = 0; y <= maxY; y += 1) {
        for (let x = 0; x <= maxX; x += 1) {
            const cell = board[y][x];
            if (cell === '') {
                let min = { id: '', dist: maxX + maxY };
                let dists = [];

                for (let point of points) {
                    const dist = Math.abs(x - point.x) + Math.abs(y - point.y);
                    dists.push(dist);
                    if (dist < min.dist) {
                        min = {
                            id: point.id,
                            dist
                        };
                    }
                }

                if (dists.filter(x => x === min.dist).length > 1) {
                    board[y][x] = '';
                } else {
                    board[y][x] = min.id;
                }
            }
        }
    }

    let ignore = [];

    for (let y = 0; y <= maxY; y += 1) {
        for (let x = 0; x <= maxX; x += 1) {
            const cell = board[y][x];
            if ((x === 0 || y === 0 || x === maxX || y === maxY) && cell !== '' && ignore.indexOf(cell) === -1) {
                ignore.push(cell);
            }
        }
    }
    ignore.sort((a, b) => { return a - b });
    console.log(ignore);

    let largest = 0;
    let counts = [];

    for (let i = 0; i < points.length; i += 1) {

        if (ignore.indexOf(i) > -1) continue;

        let count = 0;

        for (let y = 0; y <= maxY; y += 1) {
            for (let x = 0; x <= maxX; x += 1) {
                const cell = board[y][x];
                if (i === cell) count += 1;
            }
        }
        counts.push(count);
    }
    counts.sort((a, b) => { return a - b });
    console.log(counts);
});
