const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    // console.log(data);

    let risk = 0;

    for (let y = 0; y < data.length; y += 1) {
        for (let x = 0; x < data[0].length; x += 1) {
            // console.log(y, x);
            
            const cell = parseInt(data[y][x]);

            const left = parseInt(data[y][x - 1] || 10);
            const right = parseInt(data[y][x + 1] || 10);
            const up = parseInt(data[y - 1]?.[x] || 10);
            const down = parseInt(data[y + 1]?.[x] || 10);

            if ([left, right, up, down].every(d => cell < d)) {
                risk += cell + 1;
            }
        }
    }
    console.log(risk);
});
