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

        console.log(axis, value);

        for (const point of Object.keys(sheet)) {
            const [x, y] = point.split(':').map(d => parseInt(d));
            const coords = {x, y};

            if (coords[axis] > value) {
                if (axis === 'x') sheet[`${value - (x - value)}:${y}`] = true;
                if (axis === 'y') sheet[`${x}:${value - (y - value)}`] = true;

                delete sheet[`${x}:${y}`];
            }
        }

        console.log(Object.keys(sheet).length);

        return;
    }
});
