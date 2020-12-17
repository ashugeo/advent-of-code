const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let slices = { 'w0': { 'z0': {} } };
    let prev;

    for (let y = -1; y < data.length - 1; y += 1) {
        slices.w0.z0[`y${y}`] = {};
        for (let x = -1; x < data[0].length - 1; x += 1) {
            const cell = data[y + 1][x + 1];
            slices.w0.z0[`y${y}`][`x${x}`] = cell;
        }
    }

    console.log(JSON.stringify(slices, null, 4));
    
    const getNeighbors = (x, y, z, w) => {
        const neighbors = [];

        for (let d = -1; d <= 1; d += 1) {
            for (let c = -1; c <= 1; c += 1) {
                for (let b = -1; b <= 1; b += 1) {
                    for (let a = -1; a <= 1; a += 1) {
                        if (a === 0 && b === 0 && c === 0 && d === 0) continue;

                        const cell = prev[`w${w + d}`]?.[`z${z + c}`]?.[`y${y + b}`]?.[`x${x + a}`];
                        if (cell) neighbors.push(cell);
                    }
                }
            }
        }
        
        return neighbors.filter(d => d === '#').length;
    }

    const expand = () => {
        const minW = Math.min(...Object.keys(slices).map(d => d.match(/-?\d+/g)));
        const maxW = Math.max(...Object.keys(slices).map(d => d.match(/-?\d+/g)));
        const minZ = Math.min(...Object.keys(slices.w0).map(d => d.match(/-?\d+/g)));
        const maxZ = Math.max(...Object.keys(slices.w0).map(d => d.match(/-?\d+/g)));
        const minY = Math.min(...Object.keys(slices.w0.z0).map(d => d.match(/-?\d+/g)));
        const maxY = Math.max(...Object.keys(slices.w0.z0).map(d => d.match(/-?\d+/g)));
        const minX = Math.min(...Object.keys(slices.w0.z0.y0).map(d => d.match(/-?\d+/g)));
        const maxX = Math.max(...Object.keys(slices.w0.z0.y0).map(d => d.match(/-?\d+/g)));

        slices[`w${minW - 1}`] = JSON.parse(JSON.stringify(slices[`w${minW}`]).replace(/\#/g, '.'));
        slices[`w${maxW + 1}`] = JSON.parse(JSON.stringify(slices[`w${maxW}`]).replace(/\#/g, '.'));

        for (const slice of Object.values(slices)) {
            slice[`z${minZ - 1}`] = JSON.parse(JSON.stringify(slice[`z${minZ}`]).replace(/\#/g, '.'));
            slice[`z${maxZ + 1}`] = JSON.parse(JSON.stringify(slice[`z${maxZ}`]).replace(/\#/g, '.'));
        }

        for (const slice of Object.values(slices)) {
            for (const cube of Object.values(slice)) {
                cube[`y${minY - 1}`] = JSON.parse(JSON.stringify(cube[`y${minY}`]).replace(/\#/g, '.'));
                cube[`y${maxY + 1}`] = JSON.parse(JSON.stringify(cube[`y${maxY}`]).replace(/\#/g, '.'));
            }
        }

        for (const slice of Object.values(slices)) {
            for (const cube of Object.values(slice)) {
                for (const row of Object.values(cube)) {
                    row[`x${minX - 1}`] = JSON.parse(JSON.stringify(row[`x${minX}`]).replace(/\#/g, '.'));
                    row[`x${maxX + 1}`] = JSON.parse(JSON.stringify(row[`x${maxX}`]).replace(/\#/g, '.'));
                }
            }
        }
    }

    const sortedKeys = obj => {
        return Object.keys(obj).sort((a, b) => parseInt(a.match(/-?\d+/g)) - parseInt(b.match(/-?\d+/g)));
    }

    for (let n = 0; n < 6; n += 1) {
        expand();
        prev = JSON.parse(JSON.stringify(slices));

        console.log(prev);

        console.log('');
        console.log('');
        console.log(`After ${n} cycle${n > 1 ? 's' : ''}:`);
        
        for (const _w of sortedKeys(prev)) {
            const w = parseInt(_w.match(/-?\d+/g));

            for (const _z of sortedKeys(prev[_w])) {
                const z = parseInt(_z.match(/-?\d+/g));

                console.log('');
                console.log(`z=${z}, w=${w}`);

                for (const _y of sortedKeys(prev[_w][_z])) {
                    const y = parseInt(_y.match(/-?\d+/g));

                    console.log(sortedKeys(prev[_w][_z][_y]).map(d => prev[_w][_z][_y][d]).join(''));

                    for (const _x of sortedKeys(prev[_w][_z][_y])) {
                        const x = parseInt(_x.match(/-?\d+/g));

                        const cell = prev[_w][_z][_y][_x];
                        const neighbors = getNeighbors(x, y, z, w);

                        if (cell === '#') {
                            if (neighbors === 2 || neighbors === 3) slices[_w][_z][_y][_x] = '#';
                            else slices[_w][_z][_y][_x] = '.';
                        } else {
                            if (neighbors === 3) slices[_w][_z][_y][_x] = '#';
                            else slices[_w][_z][_y][_x] = '.';
                        }
                    }
                }
            }
        }
    }

    // console.log(JSON.stringify(slices, null, 4));
    console.log(JSON.stringify(slices).match(/\#/g).length);
});