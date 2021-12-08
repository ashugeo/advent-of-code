const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split(',').map(d => parseInt(d.trim()));

    const fishes = data;

    for (let day = 0; day < 80; day += 1) {
        const _fishes = [...fishes];

        for (let f = 0; f < _fishes.length; f += 1) {
            fishes[f] -= 1;

            if (_fishes[f] === 0) {
                fishes.push(8);
                fishes[f] = 6;
            }
        }
    }
    console.log(fishes.length);
});
