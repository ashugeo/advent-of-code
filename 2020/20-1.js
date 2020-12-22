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

    let total = 1;

    for (const [id, alts] of Object.entries(tiles)) {
        // console.log(id);

        let n = 0;

        for (const alt of alts) {
            // console.log('');
            // console.log('---');

            let valid = 0;

            for (const dir of [0, 1, 2, 3]) {
                const side = ['top', 'right', 'bottom', 'left'][dir];
                const target = ['bottom', 'left', 'top', 'right'][dir];

                // console.log(`Take ${side}, find ${target}`);
                const edge = getEdge(alt.layout, side);

                for (const [_id, _alts] of Object.entries(tiles)) {
                    if (id === _id) continue;
                    // console.log(_id);

                    for (const _alt of _alts) {
                        const _edge = getEdge(_alt.layout, target);
                        if (edge === _edge) {
                            // console.log(`Tile ${_id} can go to the ${side} of tile ${id}`);
                            valid += 1;
                        }
                    }
                }
            }

            n = Math.max(valid, n);
        }

        if (n === 2) {
            console.log(id);
            console.log('---');
            total *= parseInt(id);
        }
    }

    console.log(total);
});