const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let slices = { 'z0': {} };
    let prev;

    for (let y = -1; y < data.length - 1; y += 1) {
        slices.z0[`y${y}`] = {};
        for (let x = -1; x < data[0].length - 1; x += 1) {
            const cell = data[y + 1][x + 1];
            slices.z0[`y${y}`][`x${x}`] = cell;
        }
    }

    console.log(slices);
    
    const getNeighbors = (x, y, z) => {
        const neighbors = [];

        for (let c = -1; c <= 1; c += 1) {
            for (let b = -1; b <= 1; b += 1) {
                for (let a = -1; a <= 1; a += 1) {
                    if (a === 0 && b === 0 && c === 0) continue;
                    // console.log(z + c, y + b, x + a, `[z${z + c}][y${y + b}][x${x + a}]`);

                    const cell = prev[`z${z + c}`]?.[`y${y + b}`]?.[`x${x + a}`];
                    if (cell) neighbors.push(cell);
                }
            }
        }

        // console.log(`cell [${slices[`z${z}`][`y${y}`][`x${x}`]}] (z${z}, y${y}, x${x}) has ${neighbors.filter(d => d === '#').length} neighbor #`);
        
        return neighbors.filter(d => d === '#').length;
    }

    const expand = () => {
        const minZ = Math.min(...Object.keys(slices).map(d => d.match(/-?\d+/g)));
        const maxZ = Math.max(...Object.keys(slices).map(d => d.match(/-?\d+/g)));
        const minY = Math.min(...Object.keys(slices.z0).map(d => d.match(/-?\d+/g)));
        const maxY = Math.max(...Object.keys(slices.z0).map(d => d.match(/-?\d+/g)));
        const minX = Math.min(...Object.keys(slices.z0.y0).map(d => d.match(/-?\d+/g)));
        const maxX = Math.max(...Object.keys(slices.z0.y0).map(d => d.match(/-?\d+/g)));

        slices[`z${minZ - 1}`] = JSON.parse(JSON.stringify(slices[`z${minZ}`]).replace(/\#/g, '.'));
        slices[`z${maxZ + 1}`] = JSON.parse(JSON.stringify(slices[`z${maxZ}`]).replace(/\#/g, '.'));

        for (const slice of Object.values(slices)) {
            slice[`y${minY - 1}`] = JSON.parse(JSON.stringify(slice[`y${minY}`]).replace(/\#/g, '.'));
            slice[`y${maxY + 1}`] = JSON.parse(JSON.stringify(slice[`y${maxY}`]).replace(/\#/g, '.'));
        }

        for (const slice of Object.values(slices)) {
            for (const row of Object.values(slice)) {
                row[`x${minX - 1}`] = JSON.parse(JSON.stringify(row[`x${minX}`]).replace(/\#/g, '.'));
                row[`x${maxX + 1}`] = JSON.parse(JSON.stringify(row[`x${maxX}`]).replace(/\#/g, '.'));
            }
        }
    }

    const sortedKeys = obj => {
        return Object.keys(obj).sort((a, b) => parseInt(a.match(/-?\d+/g)) - parseInt(b.match(/-?\d+/g)));
    }

    for (let n = 0; n < 6; n += 1) {
        expand();
        prev = JSON.parse(JSON.stringify(slices));

        console.log('');
        console.log('');
        console.log(`After ${n} cycle${n > 1 ? 's' : ''}:`);
        
        for (const _z of sortedKeys(prev)) {
            const z = parseInt(_z.match(/-?\d+/g));

            console.log('');
            console.log(`z=${z}`);

            for (const _y of sortedKeys(prev[_z])) {
                const y = parseInt(_y.match(/-?\d+/g));

                console.log(sortedKeys(prev[_z][_y]).map(d => prev[_z][_y][d]).join(''));

                for (const _x of sortedKeys(prev[_z][_y])) {
                    const x = parseInt(_x.match(/-?\d+/g));

                    const cell = prev[_z][_y][_x];
                    const neighbors = getNeighbors(x, y, z);

                    if (cell === '#') {
                        if (neighbors === 2 || neighbors === 3) slices[_z][_y][_x] = '#';
                        else slices[_z][_y][_x] = '.';
                    } else {
                        if (neighbors === 3) slices[_z][_y][_x] = '#';
                        else slices[_z][_y][_x] = '.';
                    }
                }
            }
        }
    }

    // console.log(JSON.stringify(slices, null, 4));
    console.log(JSON.stringify(slices).match(/\#/g).length);
});