const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let x = 0;
    let y = 0;
    let dir = 1; // 0: north, 1: east, 2: south, 3: west

    for (const ins of data) {
        const action = ins[0];
        const value = parseInt(ins.match(/\d+/));
        // console.log(action, value);

        if (action === 'F') {
            x += [0, value, 0, -value][dir];
            y += [-value, 0, value, 0][dir];
        }
        else if (action === 'N') y -= value;
        else if (action === 'S') y += value;
        else if (action === 'E') x += value;
        else if (action === 'W') x -= value;
        else if (action === 'R') dir = (dir + value / 90) % 4;
        else if (action === 'L') {
            dir = (dir - value / 90) % 4;
            dir = dir < 0 ? dir + 4 : dir;
        }

        // console.log({x, y, dir});
    }

    console.log(x + y);
});