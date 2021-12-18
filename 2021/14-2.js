const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    let [chain, instructions] = data.trim().split('\n\n');
    instructions = instructions.split('\n');
    // console.log(chain, instructions);

    const rules = {};
    for (const instruction of instructions) rules[instruction.split(' -> ')[0]] = instruction.split(' -> ')[1];

    // console.log(rules);

    let pairs = {};

    for (let i = 0; i < chain.length - 1; i += 1) {
        let pair = `${chain[i]}${chain[i + 1]}`;
        pairs[pair] = 1;
    }

    for (let i = 0; i < 40; i += 1) {
        const _pairs = {};

        for (const pair of Object.keys(pairs)) {
            // console.log({pair});

            if (rules[pair]) {
                const newPair1 = `${pair[0]}${rules[pair]}`;
                const newPair2 = `${rules[pair]}${pair[1]}`;

                if (_pairs[newPair1]) _pairs[newPair1] += pairs[pair];
                else _pairs[newPair1] = pairs[pair];

                if (_pairs[newPair2]) _pairs[newPair2] += pairs[pair];
                else _pairs[newPair2] = pairs[pair];
            }

            // console.log(_pairs);
        }
        pairs = {..._pairs};

    }

    // console.log(pairs);

    const counts = {};

    for (const pair of Object.keys(pairs)) {
        if (counts[pair[1]]) counts[pair[1]] += pairs[pair];
        else counts[pair[1]] = pairs[pair];
    }

    counts[chain[0]] += 1;

    // console.log(counts);

    const most = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    const least = Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b);

    console.log(counts[most] - counts[least]);
});
