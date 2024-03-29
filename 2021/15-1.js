const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    data = data.trim().split('\n');

    // console.log(data);

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
        
        // console.log('parent', cell.parent);
        // console.log(`cost of x: ${cell.x} y:${cell.y}, ${value}`);

        return value;
    };

    const isInArray = (cell, array) => {
        return array.some(a => { return (a.x === cell.x && a.y === cell.y)});
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

    let closed = [start];

    for (let neighbor of open) {
        neighbor.parent = start;
        neighbor.cost = findCost(neighbor, start, objective);
    }

    while (open.length > 0) {
        // Find cell with lowest cost
        let current = open.reduce((min, o) => o.cost < min.cost ? o : min, open[0]);

        // Remove current from open, add to closed
        open = open.filter(n => { return !(n.x === current.x && n.y === current.y); });
        closed.push(current);

        // If current is the objective, path has been found
        if (current.x === objective.x && current.y === objective.y) {
            end = current;
            break;
        }

        let neighbors = findNeighbors(current);

        for (let neighbor of neighbors) {
            // console.log(neighbor);
            // Make sure neighbor has not already been evaluated
            if (isInArray(neighbor, closed)) continue;

            // Compute new cost
            const newCost = findCost(neighbor, start, objective);

            // If new cost is lower, or neighbor hasn't been evaluated
            if (newCost < neighbor.cost || !isInArray(neighbor, open)) {
                neighbor.cost = newCost;
                neighbor.parent = current;

                if (!isInArray(neighbor, open)) {
                    open.push(neighbor);
                }
            }
        }
    }

    // No path found
    if (!end) console.log('no path found');

    console.log(end.cost);
});
