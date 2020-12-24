const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    const tiles = [{
        x: 0,
        y: 0,
        color: 'white'
    }];

    for (const line of data) {
        const moves = line.match(/e|se|sw|w|nw|ne/g);
        let x = 0;
        let y = 0;

        for (const move of moves) {
            // console.log(move);
            if (move === 'e') x += 1;
            else if (move === 'w') x -= 1;

            else if (move === 'ne') {
                y -= 1;
                if (Math.abs(y) % 2 === 1) x += 1;
            }

            else if (move === 'se') {
                y += 1;
                if (Math.abs(y) % 2 === 1) x += 1;
            }

            else if (move === 'nw') {
                y -= 1;
                if (Math.abs(y) % 2 === 0) x -= 1;
            }

            else if (move === 'sw') {
                y += 1;
                if (Math.abs(y) % 2 === 0) x -= 1;
            }
        }

        const tile = tiles.find(d => d.x === x && d.y === y);

        if (tile) {
            tile.color = tile.color === 'black' ? 'white' : 'black';
        } else {
            tiles.push({
                x,
                y,
                color: 'black'
            });
        }
    }

    // console.log(tiles);
    console.log(tiles.filter(d => d.color === 'black').length);
});