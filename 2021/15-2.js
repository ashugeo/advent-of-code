const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    data = data.trim().split('\n');

    let time = Date.now();

    // console.log(data);
    const map = [...data];

    for (let i = 0; i < 4; i += 1) {
        for (const [y, line] of data.entries()) {
            for (let value of line.split('').map(d => parseInt(d))) {
                value += i + 1;
                if (value >= 10) value -= 9;
                map[y] += value;
            }
        }
    }

    const _map = [...map];

    for (let i = 0; i < 4; i += 1) {
        for (const [y, line] of _map.entries()) {
            let _line = '';
            for (let value of line.split('').map(d => parseInt(d))) {
                value += i + 1;
                if (value >= 10) value -= 9;
                _line += value;
            }
            map.push(_line);
        }
    }

    // console.log(map);
    
    data = map;

    const findNeighbors = cell => {
        let neighbors = [];
        const { x, y } = cell;
        
        if (y > 0) neighbors.push({ x: x, y: y - 1, value: parseInt(data[y - 1][x]), parent: cell }); // top
        if (x > 0) neighbors.push({ x: x - 1, y: y, value: parseInt(data[y][x - 1]), parent: cell }); // left
        if (y < data.length - 1) neighbors.push({ x: x, y: y + 1, value: parseInt(data[y + 1][x]), parent: cell }); // right
        if (x < data[0].length - 1) neighbors.push({ x: x + 1, y: y, value: parseInt(data[y][x + 1]), parent: cell }); // right

        return neighbors;
    };

    const findCost = (cell) => {
        let value = (cell.parent?.cost || 0) + parseInt(data[cell.y][cell.x]);
        return value;
    };

    const start = {
        x: 0,
        y: 0,
        value: parseInt(data[0][0]),
        cost: 0
    };

    const objective = {
        x: data[0].length - 1,
        y: data.length - 1,
        value: parseInt(data[data.length - 1][data[0].length - 1])
    };

    let end;

    let open = findNeighbors(start);
    let _open = {};

    let closed = [start];
    let _closed = {};
    _closed[`${start.x}:${start.y}`] = true;

    for (let neighbor of open) {
        neighbor.parent = start;
        neighbor.cost = findCost(neighbor, start, objective);

        _closed[`${neighbor.x}:${neighbor.y}`] = true;
    }

    while (open.length > 0) {
        // Find cell with lowest cost
        let current = open.reduce((min, o) => o.cost < min.cost ? o : min, open[0]);

        // Remove current from open, add to closed
        open = open.filter(n => { return !(n.x === current.x && n.y === current.y); });
        closed.push(current);
        _closed[`${current.x}:${current.y}`] = true;

        // If current is the objective, path has been found
        if (current.x === objective.x && current.y === objective.y) {
            end = current;
            break;
        }

        let neighbors = findNeighbors(current);

        for (let neighbor of neighbors) {
            // Make sure neighbor has not already been evaluated
            if (_closed[`${neighbor.x}:${neighbor.y}`]) continue;

            // Compute new cost
            const newCost = findCost(neighbor, start, objective);

            // If new cost is lower, or neighbor hasn't been evaluated
            if (newCost < neighbor.cost || !_open[`${neighbor.x}:${neighbor.y}`]) {
                neighbor.cost = newCost;
                neighbor.parent = current;

                if (!_open[`${neighbor.x}:${neighbor.y}`]) {
                    open.push(neighbor);
                    _open[`${neighbor.x}:${neighbor.y}`] = true;
                }
            }
        }
    }

    // No path found
    if (!end) console.log('no path found');

    console.log(end.cost);
    console.log(`${Date.now() - time}ms`);
});
