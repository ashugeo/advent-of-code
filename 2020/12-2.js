const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    const ship = { x: 0, y: 0 };
    const wp = { x: 10, y: -1 };

    for (const ins of data) {
        const action = ins[0];
        const value = parseInt(ins.match(/\d+/));
        // console.log(action, value);

        if (action === 'F') {
            ship.x += wp.x * value;
            ship.y += wp.y * value;
        }
        else if (action === 'N') wp.y -= value;
        else if (action === 'S') wp.y += value;
        else if (action === 'E') wp.x += value;
        else if (action === 'W') wp.x -= value;
        else if (action === 'R') {
            const _wp = JSON.parse(JSON.stringify(wp));

            wp.x = [_wp.x, -_wp.y, -_wp.x, _wp.y][value / 90];
            wp.y = [_wp.y, _wp.x, -_wp.y, -_wp.x][value / 90];
        }
        else if (action === 'L') {
            const _wp = JSON.parse(JSON.stringify(wp));

            wp.x = [_wp.x, _wp.y, -_wp.x, -_wp.y][value / 90];
            wp.y = [_wp.y, -_wp.x, -_wp.y, _wp.x][value / 90];
        }

        // console.log({wp});
        // console.log({ship});
    }

    console.log(Math.abs(ship.x) + Math.abs(ship.y));
});