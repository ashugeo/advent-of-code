const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => parseInt(d));
    
    const highest = Math.max(...data) + 3;
    data.push(highest);
    
    data = data.sort((a, b) => a < b ? -1 : 1);
    // console.log(data);

    findFastestPath = (d, path = []) => {
        if (d === highest) return path;

        for (let i = 3; i > 0; i -= 1) {
            if (data.includes(d + i)) {
                path.push(d  + i);
                return findFastestPath(d + i, path);
            }
        }
    }

    const path = findFastestPath(0);
    console.log(data);
    console.log(path);

    const highestBinary = data.map(_ => '1').join('');
    const lowestBinary = data.reduce((acc, curr) => path.includes(curr) ? `${acc}1` : `${acc}0`, '');

    console.log(highestBinary);
    console.log(lowestBinary);
});