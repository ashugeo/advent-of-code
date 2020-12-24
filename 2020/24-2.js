const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let tiles = { '0|0': 'white' };

    for (const line of data) {
        const moves = line.match(/e|se|sw|w|nw|ne/g);
        let x = 0;
        let y = 0;

        for (const move of moves) {
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

        let tile = tiles[`${x}|${y}`];

        if (tile) tiles[`${x}|${y}`] = tile === 'black' ? 'white' : 'black';
        else tiles[`${x}|${y}`] = 'black';
    }

    const getNeighbors = tile => {
        const [x, y] = tile.split('|').map(d => parseInt(d));
        const neighbors = [];

        neighbors.push(`${x + 1}|${y}`); // e
        neighbors.push(`${x - 1}|${y}`); // w
        
        if (Math.abs(y) % 2 === 0) {
            neighbors.push(`${x + 1}|${y - 1}`); // ne
            neighbors.push(`${x + 1}|${y + 1}`); // se
            neighbors.push(`${x}|${y - 1}`); // nw
            neighbors.push(`${x}|${y + 1}`); // sw
        } else {
            neighbors.push(`${x}|${y - 1}`); // ne
            neighbors.push(`${x}|${y + 1}`); // se
            neighbors.push(`${x - 1}|${y - 1}`); // nw
            neighbors.push(`${x - 1}|${y + 1}`); // sw
        }

        return neighbors;
    }

    for (let day = 1; day <= 100; day += 1) {
        const _tiles = {};

        const candidates = {};

        for (const blackTile of Object.keys(tiles).filter(d => tiles[d] === 'black')) {
            const neighbors = getNeighbors(blackTile);

            for (const tile of [blackTile, ...neighbors]) {
                const [x, y] = tile.split('|').map(d => parseInt(d));

                if (!candidates[`${x}|${y}`]) candidates[`${x}|${y}`] = tiles[`${x}|${y}`] || 'white';
            }
        }

        for (const [coord, color] of Object.entries(candidates)) {
            const [x, y] = coord.split('|').map(d => parseInt(d));
            
            const neighbors = getNeighbors(coord);
            const blacks = neighbors.map(d => tiles[d]).filter(d => d === 'black').length;

            if (color === 'black' && (blacks === 0 || blacks > 2)) _tiles[`${x}|${y}`] = 'white';

            else if (color === 'white' && blacks === 2) _tiles[`${x}|${y}`] = 'black';

            else _tiles[`${x}|${y}`] = color;
        }

        tiles = _tiles;

        console.log(`day ${day}: ${Object.values(tiles).filter(d => d === 'black').length}`);
    }
});