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

    const links = {};

    for (const [id, alts] of Object.entries(tiles)) {
        links[id] = { neighbors: {} };
        // console.log(id);

        // console.log('');
        // console.log('---');

        for (const dir of [0, 1, 2, 3]) {
            const side = ['top', 'right', 'bottom', 'left'][dir];
            const target = ['bottom', 'left', 'top', 'right'][dir];

            // console.log(`Take ${side}, find ${target}`);
            const edge = getEdge(alts[0].layout, side);

            for (const [_id, _alts] of Object.entries(tiles)) {
                if (id === _id) continue;

                for (const _alt of _alts) {
                    const _edge = getEdge(_alt.layout, target);
                    if (edge === _edge) {
                        console.log(`Tile ${_id} can go to the ${side} of tile ${id} with rotate ${_alt.rotate} and flip ${_alt.flip}`);
                        
                        links[id].neighbors[side] = {
                            id: _id,
                            rotate: _alt.rotate,
                            flip: _alt.flip
                        }
                    }
                }
            }
        }
    }

    console.log(JSON.stringify(links, null, 4));

    return;

    const topLeftID = Object.keys(links).find(d => {
        const sides = [
            links[d].neighbors['top'],
            links[d].neighbors['right'],
            links[d].neighbors['bottom'],
            links[d].neighbors['left']
        ].filter(d => d);
        return sides.length === 2;
    });

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

    // const size = Math.sqrt(Object.keys(tiles).length);
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