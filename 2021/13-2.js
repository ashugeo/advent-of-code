const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    let [points, instructions] = data.trim().split('\n\n').map(d => d.split('\n'));

    // console.log(points, instructions);

    let sheet = {};

    for (const point of points) {
        const [x, y] = point.split(',').map(d => parseInt(d));
        sheet[`${x}:${y}`] = true;
    }

    // console.log(Object.keys(sheet).length);

    for (const instruction of instructions) {
        let [axis, value] = instruction.split('=');
        axis = axis.split('').pop();
        value = parseInt(value);

        // console.log(axis, value);

        for (const point of Object.keys(sheet)) {
            const [x, y] = point.split(':').map(d => parseInt(d));
            const coords = {x, y};

            if (coords[axis] > value) {
                if (axis === 'x') sheet[`${value - (x - value)}:${y}`] = true;
                if (axis === 'y') sheet[`${x}:${value - (y - value)}`] = true;

                delete sheet[`${x}:${y}`];
            }
        }

        // console.log(Object.keys(sheet).length);
    }

    console.log(sheet);

    const maxX = Math.max(...Object.keys(sheet).map(d => parseInt(d.split(':')[0])));
    console.log(maxX);

    const maxY = Math.max(...Object.keys(sheet).map(d => parseInt(d.split(':')[1])));
    console.log(maxY);

    for (let y = 0; y <= maxY; y += 1) {
        let line = '';
        for (let x = 0; x <= maxX; x += 1) {
            if (sheet[`${x}:${y}`]) line += '#';
            else line += '.';
        }
        console.log(line);
    }

});
