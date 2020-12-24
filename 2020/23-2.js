const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    const labels = data.split('').map(d => parseInt(d));

    let highest = Math.max(...labels);
    for (let i = highest + 1; i <= 1000000; i += 1) labels.push(i);
    highest = 1000000;

    const cups = {};

    for (const [i, label] of labels.entries()) cups[label] = labels[i + 1] || labels[0];
    
    let curr = labels[0];

    for (let n = 1; n <= 10000000; n += 1) {
        const picks = [cups[curr], cups[cups[curr]], cups[cups[cups[curr]]]];

        let dest = curr - 1 === 0 ? highest : curr - 1;
        while (picks.includes(dest)) {
            dest -= 1;
            dest = dest === 0 ? highest : dest;
        }

        if (n % 1000000 === 0) console.log(`\n-- move ${n} --`);

        cups[curr] = cups[picks[picks.length - 1]];
        cups[picks[picks.length - 1]] = cups[dest];
        cups[dest] = picks[0];

        curr = cups[curr];
    };

    console.log(`${cups[1]} * ${cups[cups[1]]} = ${cups[1] * cups[cups[1]]}`);
});