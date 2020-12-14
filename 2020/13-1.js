const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    const time = parseInt(data[0]);
    const buses = data[1].split(',').filter(d => d !== 'x').map(d => parseInt(d));

    // console.log(time, buses);

    const times = buses.map(d => ({ id: d, wait: d - time % d }));

    const soonest = times[Object.keys(times).reduce((acc, curr) => times[curr].wait < times[acc].wait ? curr : acc)];

    console.log(soonest.id * soonest.wait);
});