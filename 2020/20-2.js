const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n\n');
    // console.log(data);

    const transpose = arr => arr[0].map((_, i) => arr.map(row => row[i]));

    const tiles = [];

    for (let entry of data) {
        entry = entry.split('\n');
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
                // rotate: 1,
                rotate: f === 1 ? 3 : 1,
                layout: transpose([...face]).map(d => d.reverse().join(''))
            });
    
            alts.push({
                flip: f === 1,
                rotate: 2,
                layout: [...face].reverse().map(d => d.reverse().join(''))
            });
    
            alts.push({
                flip: f === 1,
                // rotate: 3,
                rotate: f === 1 ? 1 : 3,
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

    const rotate = 2;
    const flip = true;

    const alt = getAlts(topLeft.layout).find(d => d.rotate === rotate && d.flip === flip);
    topLeft.layout = alt.layout;
    // console.log(alt.layout.join('\n'));

    setTile(topLeft.id, topLeft.layout, rotate, flip, 0, 0);

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
            noBorders = noBorders.map(d => {
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

    console.log(image);

    const monster = `# #    ##    ##    ### #  #  #  #  #  #`;
    // console.log(monster);

    return;

    for (const [t, tile] of tiles.entries()) {
    // for (const [t, tile] of tiles.sort(d => d.id === '1951' ? -1 : 1).entries()) {
        if (t === 0) {
            tile.coords = { x: 0, y: 0 };
            tile.flip = false;
            tile.rotate = 0;
        } else if (!tile.coords) continue;

        console.log('');
        console.log('---');
        console.log(tile);

    }
    
    console.log(tiles);
    // console.log(JSON.stringify(links, null, 4));

    return;

    const setCoords = (id, x, y) => {
        console.log('');
        console.log('---');
        console.log(id);

        links[id].coords = { x, y };

        for (const [dir, neighbor] of Object.entries(links[id].neighbors)) {
            if (links[neighbor.id].coords) continue;

            console.log(['top', 'right', 'bottom', 'left'].indexOf(dir));
            console.log(links[id].rotate);

            // x += [0, 1, 0,-1][(['top', 'right', 'bottom', 'left'].indexOf(dir) + tiles[id].rotate) % 4];
            // y += { 'top': -1, 'right': 0, 'bottom': 1, 'left': 0 }[dir];

            console.log(x, y);

            setCoords(neighbor.id, x, y);
        }

    }

    setCoords(topLeftID, 0, 0);

    // console.log(links);

    // console.log(links);
    // links[topLeftID].coords = { x: 0, y: 0};

    // for (const id of Object.keys(links)) {
    //     console.log('');
    //     console.log('---');
    //     console.log(id);

    //     const { neighbors } = links[id];

    //     // console.log(neighbors);

    //     for (const [dir, neighbor] of Object.entries(neighbors)) {
    //         console.log(dir, neighbor.id);

    //         // links[neighbor.id].x = [][dir];
    //     }
    // }

    return;

    // const board = new Array(size).fill([]).map(d => new Array(size).fill(null));
    // // console.log(board);

    // const topLeftID = Object.keys(tiles).find(d => {
    //     const sides = [
    //         tiles[d]['top'],
    //         tiles[d]['right'],
    //         tiles[d]['bottom'],
    //         tiles[d]['left']
    //     ].filter(d => d);
    //     return sides.length === 2;
    // });
    // const topLeft = tiles[topLeftID];

    // let rot = ''
    // if (topLeft.top && topLeft.right) rot = 1;
    // else if (topLeft.right && topLeft.bottom) rot = 0;
    // else if (topLeft.bottom && topLeft.left) rot = 3;
    // else if (topLeft.left && topLeft.top) rot = 2;
    // // console.log(rot);

    // board[0][0] = {
    //     id: topLeftID,
    //     rotate: rot,
    //     flip: false,
    //     top: topLeft.top,
    //     right: topLeft.right,
    //     bottom: topLeft.bottom,
    //     left: topLeft.left
    // };

    // console.log(JSON.stringify(board, null, 4));

    // for (let j = 0; j < size; j += 1) {
    //     for (let i = 0; i < size; i += 1) {
    //         if (board[j][i]) continue;
    //         // console.log(i, j);

    //         const left = board[j][i - 1];
    //         const top = board[j - 1]?.[i];

    //         if (left) {
    //             let rot;
    //             if (left.top && left.right) rot = 1;
    //             else if (left.right && left.bottom) rot = 0;
    //             else if (left.bottom && left.left) rot = 3;
    //             else if (left.left && left.top) rot = 2;
    //             console.log(rot);
    
    //             const cell = left[['right', 'top', 'left', 'bottom'][rot]];
    //             console.log(cell);
    
    //             board[j][i] = {
    //                 id: cell.id,
    //                 rotate: (cell.rotate + rot) % 4,
    //                 flip: cell.flip,
    //                 top: tiles[cell.id].top,
    //                 right: tiles[cell.id].right,
    //                 bottom: tiles[cell.id].bottom,
    //                 left: tiles[cell.id].left
    //             }
    //         }
            
    //         // if (top) {
    //         //     console.log('');
    //         //     console.log('---');
    //         //     console.log('');
    //         //     console.log({top});

    //         //     let rot;
    //         //     if (top.top && top.right) rot = 1;
    //         //     else if (top.right && top.bottom) rot = 0;
    //         //     else if (top.bottom && top.left) rot = 3;
    //         //     else if (top.left && top.top) rot = 2;
    //         //     console.log(rot);
    
    //         //     const cell = top[['top', 'right', 'bottom', 'left'][rot]];
    //         //     console.log({cell});
    
    //         //     // board[j][i] = {
    //         //     //     id: cell.id,
    //         //     //     rotate: (cell.rotate + rot) % 4,
    //         //     //     flip: cell.flip,
    //         //     //     top: tiles[cell.id].top,
    //         //     //     right: tiles[cell.id].right,
    //         //     //     bottom: tiles[cell.id].bottom,
    //         //     //     left: tiles[cell.id].left
    //         //     // }
    //         // }

    //         console.log(JSON.stringify(board, null, 4));
    //     }
    // }

    // console.log(board.map(d => d.map(f => f ? f.id : '')));
});