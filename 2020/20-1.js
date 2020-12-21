const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n\n');
    // console.log(data);

    const transpose = arr => arr[0].map((_, i) => arr.map(row => row[i]));

    const tiles = {};

    for (let entry of data) {
        entry = entry.split('\n');
        const id = entry[0].match(/\d+/)[0];
        entry.shift();

        let layout = [...entry].map(d => d.split(''));
        let flip = layout.map(d => [...d].reverse());

        tiles[id] = [];

        for (const [f, face] of [layout, flip].entries()) {
            tiles[id].push({
                flip: f === 1,
                rotate: 0,
                layout: [...face].map(d => d.join(''))
            });
    
            tiles[id].push({
                flip: f === 1,
                // rotate: 1,
                rotate: f === 1 ? 3 : 1,
                layout: transpose([...face]).map(d => d.reverse().join(''))
            });
    
            tiles[id].push({
                flip: f === 1,
                rotate: 2,
                layout: [...face].reverse().map(d => d.reverse().join(''))
            });
    
            tiles[id].push({
                flip: f === 1,
                // rotate: 3,
                rotate: f === 1 ? 1 : 3,
                layout: transpose([...face]).map(d => d.join(''))
            });
        }
    }

    const getEdge = (layout, side) => {
        switch (side) {
            case 'top':
                return layout[0];

            case 'right':
                return layout.map(d => d.split('')[d.split('').length - 1]).join('');

            case 'bottom':
                return layout[layout.length - 1];

            case 'left':
                return layout.map(d => d[0]).join('');
        }
    }

    const first = tiles[Object.keys(tiles)[0]];
    const alt = first[0];

    const board = [{
        x: 0,
        y: 0,
        id: Object.keys(tiles)[0],
        ...alt
    }];

    console.log(board);

    for (const dir of [0, 1, 2, 3]) {
        //   0
        // 3 X 1
        //   2

        for (const tile of board) {
            // console.log(tile);
            console.log('')
            console.log('---');
            console.log('')

            const _x = tile.x + [0, 1, 0, -1][dir];
            const _y = tile.y + [-1, 0, 1, 0][dir];

            const side = ['top', 'right', 'bottom', 'left'][dir];
            const target = ['bottom', 'left', 'top', 'right'][dir];

            if (board.some(t => t.x === _x && t.y === _y)) {
                console.log(`Board has a tile at { x: ${_x}, y: ${_y} }`);
            } else {
                console.log(`Board is empty at { x: ${_x}, y: ${_y} } (take ${side}, find ${target})`);

                const edge = getEdge(alt.layout, side);

                for (const [id, alts] of Object.entries(tiles)) {
                    if (id === Object.keys(tiles)[0]) continue;
                    // console.log(id);

                    for (const alt of alts) {
                        const _edge = getEdge(alt.layout, target);
                        if (edge === _edge) {
                            console.log(`Tile ${id} can go to the ${side} of tile ${tile.id}`);
                            // console.log(bottom);
                            // console.log(alt);

                            // board.push({
                            //     x: -1,
                            //     y: 0,
                            //     id,
                            //     ...alt
                            // })
                        }
                    }
                }
            }
        }
    }
});