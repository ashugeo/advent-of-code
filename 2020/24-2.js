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

    const countNeighbors = tile => {
        const { x, y } = tile;
        const neighbors = [];

        neighbors.push(tiles.find(d => d.x === x + 1 && d.y === y)); // e
        neighbors.push(tiles.find(d => d.x === x - 1 && d.y === y)); // w
        
        if (Math.abs(y) % 2 === 0) {
            neighbors.push(tiles.find(d => d.x === x + 1 && d.y === y - 1)); // ne
            neighbors.push(tiles.find(d => d.x === x + 1 && d.y === y + 1)); // se

            neighbors.push(tiles.find(d => d.x === x && d.y === y - 1)); // nw
            neighbors.push(tiles.find(d => d.x === x && d.y === y + 1)); // sw
        } else {
            neighbors.push(tiles.find(d => d.x === x && d.y === y - 1)); // ne
            neighbors.push(tiles.find(d => d.x === x && d.y === y + 1)); // se

            neighbors.push(tiles.find(d => d.x === x - 1 && d.y === y - 1)); // nw
            neighbors.push(tiles.find(d => d.x === x - 1 && d.y === y + 1)); // sw
        }

        // console.log(neighbors);

        return [
            neighbors.filter(d => !d || d.color === 'white').length,
            neighbors.filter(d => d?.color === 'black').length
        ];
    }

    for (let day = 1; day <= 100; day += 1) {
        const _tiles = [];

        const minX = Math.min(...tiles.map(d => d.x)) - 1;
        const maxX = Math.max(...tiles.map(d => d.x)) + 1;
        const minY = Math.min(...tiles.map(d => d.y)) - 1;
        const maxY = Math.max(...tiles.map(d => d.y)) + 1;
        // console.log(minX, maxX);
        // console.log(minY, maxY);

        for (let y = minY; y <= maxY; y += 1) {
            for (let x = minX; x <= maxX; x += 1) {
                // console.log(y, x);
                let tile = tiles.find(d => d.x === x && d.y === y);

                if (!tile) {
                    tile = {
                        x,
                        y,
                        color: 'white'
                    };
                    tiles.push(tile);
                }
                
                // console.log(tile);
                const [whiteNeighbors, blackNeighbors] = countNeighbors(tile);
                // console.log({whiteNeighbors, blackNeighbors});

                if (tile.color === 'black' && (blackNeighbors === 0 || blackNeighbors > 2)) {
                    _tiles.push({
                        x,
                        y,
                        color: 'white'
                    });
                }
                else if (tile.color === 'white' && blackNeighbors === 2) {
                    _tiles.push({
                        x,
                        y,
                        color: 'black'
                    });
                } else {
                    _tiles.push({
                        x,
                        y,
                        color: tile.color
                    });
                }
            }
        }

        tiles = _tiles;

        console.log(`day ${day}: ${tiles.filter(d => d.color === 'black').length}`);

        // return;
    }
});