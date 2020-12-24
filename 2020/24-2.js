const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let tiles = [{
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

    const getNeighborsCoords = tile => {
        const { x, y } = tile;
        const neighbors = [];

        neighbors.push({ x: x + 1, y }); // e
        neighbors.push({ x: x - 1, y }); // w
        
        if (Math.abs(y) % 2 === 0) {
            neighbors.push({ x: x + 1, y: y - 1 }); // ne
            neighbors.push({ x: x + 1, y: y + 1 }); // se
            neighbors.push({ x, y: y - 1 }); // nw
            neighbors.push({ x, y: y + 1 }); // sw
        } else {
            neighbors.push({ x, y: y - 1 }); // ne
            neighbors.push({ x, y: y + 1 }); // se
            neighbors.push({ x: x - 1, y: y - 1 }); // nw
            neighbors.push({ x: x - 1, y: y + 1 }); // sw
        }

        return neighbors;
    }

    const getNeighbors = tile => {
        const neighbors = [];

        const coords = getNeighborsCoords(tile);
        for (const coord of coords) {
            let tile = tiles.find(d => d.x === coord.x && d.y === coord.y);

            if (!tile) tile = { x: coord.x, y: coord.y, color: 'white' };

            neighbors.push(tile);
        }

        return neighbors;
    }

    for (let day = 1; day <= 100; day += 1) {
        const _tiles = [];

        const candidates = [];

        for (const blackTile of tiles.filter(d => d.color === 'black')) {
            const neighbors = getNeighbors(blackTile);

            for (const tile of [blackTile, ...neighbors]) {
                if (!candidates.some(d => d.x === tile.x && d.y === tile.y)) candidates.push(tile);
            }
        }

        for (const tile of candidates) {
            const { x, y } = tile;
            
            const neighbors = getNeighbors(tile);
            const blackNeighbors = neighbors.filter(d => d.color === 'black').length;

            if (tile.color === 'black' && (blackNeighbors === 0 || blackNeighbors > 2)) {
                _tiles.push({ x, y, color: 'white' });
            }
            else if (tile.color === 'white' && blackNeighbors === 2) {
                _tiles.push({ x, y, color: 'black' });
            }
            else {
                _tiles.push({ x, y, color: tile.color });
            }
        }

        tiles = _tiles;

        console.log(`day ${day}: ${tiles.filter(d => d.color === 'black').length}`);
    }
});