const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    // console.log(data);

    let seats = [];

    for (const seat of data) {
        let row = seat.substring(0, 7);
        row = row.replace(/F/g, 0).replace(/B/g, 1);
        row = parseInt(row, 2);
        // console.log(row);

        let col = seat.substring(7);
        col = col.replace(/L/g, 0).replace(/R/g, 1);
        col = parseInt(col, 2);
        // console.log(col);

        const id = row * 8 + col;
    
        seats.push(id);
    }

    for (let i = Math.min(...seats); i < Math.max(...seats); i += 1) {
        if (!seats.includes(i)) console.log(i);
    }
});