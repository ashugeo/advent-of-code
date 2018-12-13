const fs = require('fs');

const initial = '......................#..####.##.####...#....#######..#.#..#..#.#.#####.######..#.#.#.#..##.###.#....####.#.#....#.#####'; // padded with 20 leading dots
const iterations = 20;

let current = '';
let pots = [];

fs.readFile('./data.md', 'utf8', (err, data) => {
    let lines = data.split('\n');
    lines.pop();

    let rules = [];

    for (let line of lines) {
        let chars = line.split(' =>')[0].split('')
        let out = line.split('=> ')[1];
        rules.push({ chars, out });
    }

    current = initial;

    for (let i = 0; i <= iterations; i += 1) {
        let next = '';

        pots = [];

        for (let id = -20; id < current.split('').length - 18; id += 1) {
            pots.push({ id, val: current.split('')[id + 20] ? current.split('')[id + 20] : '.' })
        }

        for (let pot of pots) {
            let found = false;

            let potMinus2 = pots.find((p) => p.id === pot.id - 2);
            if (!potMinus2) potMinus2 = {val: '.'};

            let potMinus1 = pots.find((p) => p.id === pot.id - 1);
            if (!potMinus1) potMinus1 = {val: '.'};

            let potPlus1 = pots.find((p) => p.id === pot.id + 1);
            if (!potPlus1) potPlus1 = {val: '.'};

            let potPlus2 = pots.find((p) => p.id === pot.id + 2);
            if (!potPlus2) potPlus2 = {val: '.'};


            for (let rule of rules) {
                if (
                    potMinus2.val === rule.chars[0] &&
                    potMinus1.val === rule.chars[1] &&
                    pot.val === rule.chars[2] &&
                    potPlus1.val === rule.chars[3] &&
                    potPlus2.val === rule.chars[4]
                ) {
                    next += rule.out;
                    found = true;
                }
            }

            if (!found) next += '.';
        }

        current = next;
        console.log(current);
    }

    console.log(pots);

    const sum = pots.reduce((a, b) => b.val === '#' ? a + b.id : a, 0);

    console.log(sum);
});
