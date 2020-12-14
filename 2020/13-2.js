const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (a, b) => a * b / gcd(a, b);

    const buses = data[1].split(',')
        .map((d, i) => d === 'x' ? null : { id: parseInt(d), offset: i })
        .filter(d => d)
        .sort((a, b) => b.id - a.id);
    
    // console.log(buses);

    let t = buses[0].id - buses[0].offset;
    let step = buses[0].id;
    
    // console.log(t);

    for (const bus of buses) {
        while ((t + bus.offset) % bus.id !== 0) t += step;
        step = lcm(step, bus.id);
    }

    console.log(t);
});