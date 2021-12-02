const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    const pos = {
        h: 0,
        d: 0,
        a: 0
    };

    for (const line of data) {
        let [move, qty] = line.split(' ');
        qty = parseInt(qty);
        console.log(move, qty);

        if (move === 'forward') {
            pos.h += qty;
            pos.d += pos.a * qty;
        }
        else if (move === 'up') pos.a -= qty;
        else if (move === 'down') pos.a += qty;
    }

    console.log(pos);
    console.log(pos.h * pos.d);
});
