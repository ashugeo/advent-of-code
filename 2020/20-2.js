const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n\n');
    // console.log(data);

    const transpose = arr => arr[0].map((_, i) => arr.map(row => row[i]));

    let tiles = [];

    for (let entry of data) {
        entry = entry.split('\n').filter(d => d);
        const id = entry[0].match(/\d+/)[0];
        entry.shift();

        tiles.push({ id, layout: entry });
    }

    const size = Math.sqrt(Object.keys(tiles).length);

    const findNeighbor = (tile, side) => {
        // console.log('');
        // console.log('---');
        // console.log(`Find tile to ${side} of ${tile.id}…`);
        const edge = getEdge(tile.layout, side);
        // console.log(edge);

        const target = {
            'top': 'bottom',
            'right': 'left',
            'bottom': 'top',
            'left': 'right'
        }[side];

        for (const _tile of tiles) {
            if (tile.id === _tile.id) continue;

            const alts = getAlts(_tile.layout);

            for (const alt of alts) {
                const _edge = getEdge(alt.layout, target);

                if (edge === _edge) {
                    // console.log(`Tile ${_tile.id} can go to the ${side} of tile ${tile.id} with rotate ${alt.rotate} and flip ${alt.flip}`);

                    // console.log(alt.layout.join('\n'));
                    
                    if (side === 'top') setTile(_tile.id, alt.layout, alt.rotate, alt.flip, tile.x, tile.y - 1);
                    else if (side === 'right') setTile(_tile.id, alt.layout, alt.rotate, alt.flip, tile.x + 1, tile.y)
                    else if (side === 'bottom') setTile(_tile.id, alt.layout, alt.rotate, alt.flip, tile.x, tile.y + 1)
                    else if (side === 'left') setTile(_tile.id, alt.layout, alt.rotate, alt.flip, tile.x - 1, tile.y)
                }
            }
        }
    }

    const setTile = (id, layout, rotate, flip, x, y) => {
        // console.log({ id, rotate, flip, x, y });

        const tile = tiles.find(d => d.id == id);
        tile.layout = layout;
        tile.rotate = rotate;
        tile.flip = flip;
        tile.x = x;
        tile.y = y;
        // console.log(tile);

        if (x + 1 < size && !tiles.find(d => d.x === x + 1 && d.y === y)) findNeighbor(tile, 'right');
        if (y + 1 < size && !tiles.find(d => d.x === x && d.y === y + 1)) findNeighbor(tile, 'bottom');
    }

    const getAlts = layout => {
        layout = layout.map(d => d.split(''));

        const alts = [];

        let flip = layout.map(d => [...d].reverse());

        for (const [f, face] of [layout, flip].entries()) {
            alts.push({
                flip: f === 1,
                rotate: 0,
                layout: [...face].map(d => d.join(''))
            });
    
            alts.push({
                flip: f === 1,
                rotate: 1,
                layout: transpose([...face]).map(d => d.reverse().join(''))
            });
    
            alts.push({
                flip: f === 1,
                rotate: 2,
                layout: [...face].reverse().map(d => d.reverse().join(''))
            });
    
            alts.push({
                flip: f === 1,
                rotate: 3,
                layout: transpose([...face]).map(d => d.join(''))
            });
        }

        return alts;
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

    findTopLeft = () => {
        for (const tile of tiles) {
            let neighbors = {};

            for (const dir of [0, 1, 2, 3]) {
                const side = ['top', 'right', 'bottom', 'left'][dir];
                const target = ['bottom', 'left', 'top', 'right'][dir];
    
                const edge = getEdge(tile.layout, side);
    
                for (const _tile of tiles) {
                    if (tile.id === _tile.id) continue;

                    const alts = getAlts(_tile.layout);
    
                    for (const alt of alts) {
                        const _edge = getEdge(alt.layout, target);
    
                        if (edge === _edge) {
                            // console.log(`Tile ${_tile.id} can go to the ${side} of tile ${tile.id} with rotate ${alt.rotate} and flip ${alt.flip}`);

                            neighbors[side] = _tile;
                        }
                    }
                }
            }

            if (Object.keys(neighbors).length === 2) {
                tile.neighbors = neighbors;
                return tile;
            }
        }
    }

    const topLeft = findTopLeft();
    // console.log({topLeft});


    const getTiles = () => {
        for (const rotate of [0, 1, 2, 3]) {
            for (const flip of [false, true]) {
                const alt = getAlts(topLeft.layout).find(d => d.rotate === rotate && d.flip === flip);
                topLeft.layout = alt.layout;
        
                tiles.forEach(d => {
                    d.x = undefined;
                    d.y = undefined;
                });
            
                setTile(topLeft.id, topLeft.layout, rotate, flip, 0, 0);
        
                if (tiles.every(d => !isNaN(d.x) && !isNaN(d.y))) return tiles;
            }
        }
    }

    tiles = getTiles();

    const image = [];

    for (let y = 0; y < size; y += 1) {
        const row = tiles
            .filter(d => d.y === y)
            .sort((a, b) => a.x - b.x)
            .map(d => d.id);

        for (const id of row) {
            const tile = tiles.find(d => d.id === id);
            // console.log(tile.layout.join('\n'));

            let noBorders = tile.layout;
            noBorders.shift();
            noBorders.pop();
            noBorders = noBorders.filter(d => d).map(d => {
                d = d.split('');
                d.shift();
                d.pop();
                d = d.join('');
                return d;
            });

            for (let _y = 0; _y < noBorders.length; _y += 1) {
                const i = y * noBorders.length + _y;
                if (!image[i]) image[i] = '';
                image[i] += noBorders[_y];
            }
        }
    }

    let monster = `
                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `.split('\n');
    monster.shift();
    monster = monster.join(' '.repeat(image[0].length - monster[0].length)).trim().replace(/ /g, '.');

    const re = new RegExp(monster, 'g');

    const images = getAlts(image);

    for (const image of images) {
        let output = image.layout.join('');
        // console.log(output.length);
        
        if (output.match(re)) {

            // console.log(output);
            // console.log(output.match(/#/g).length, '#');

            output = output.replace(re, (_, index) => {
                let str =  '';
                for (const [i, char] of monster.split('').entries()) {
                    if (char === '#') str += 'O';
                    else str += output[index + i];
                }

                return str;
            });

            // console.log(output.match(/.{1,24}/g).map(d => d.replace(/#/g, '.')));
            console.log(output.match(/.{1,96}/g).map(d => d.replace(/#/g, '.')));

            console.log(output.match(/#/g).length, '#');
        }
    }
});

// 2316
// 2380
// 2410