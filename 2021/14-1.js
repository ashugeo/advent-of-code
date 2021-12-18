const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    let [chain, instructions] = data.trim().split('\n\n');
    instructions = instructions.split('\n');
    // console.log(chain, instructions);

    const rules = {};
    for (const instruction of instructions) rules[instruction.split(' -> ')[0]] = instruction.split(' -> ')[1];

    // console.log(rules);

    for (let i = 0; i < 10; i += 1) {

        let n = 0;
        let length = chain.length;

        while (n < length - 1) {
            let pair = `${chain[n]}${chain[n + 1]}`;
            // console.log({pair});

            if (rules[pair]) {
                chain = `${chain.slice(0, n + 1)}${rules[pair]}${chain.slice(n + 1)}`;
                n += 1;
                length += 1;
            }
            
            n += 1;
        }

        // console.log(`After step ${i + 1}: ${chain}`);
    }

    console.log(chain.length);
    const letters = [...new Set(chain.split(''))];
    
    const counts = {};
    for (const letter of letters) {
        const count = chain.match(new RegExp(letter, 'g')).length;
        counts[count] = letter;
    }

    const min = Math.min(...Object.keys(counts).map(d => parseInt(d)));
    const max = Math.max(...Object.keys(counts).map(d => parseInt(d)));

    console.log(max - min);
});
