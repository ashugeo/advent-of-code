const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    // console.log(data);
    console.clear();

    const all = {};

    for (const rule of data) {
        // console.log(rule);
        const container = rule.match(/^\w+ \w+/)[0];
        // console.log(container);

        all[container] = [];

        const contained = rule.split('contain ')[1].split(', ');
        // console.log(contained);

        for (let item of contained) {
            item = item.replace(/no/g, 0);

            const count = parseInt(item);
            // console.log(count);

            if (count) {
                const color = item.match(/(?:\d) (\w+ \w+)/)[1];
                // console.log(color);

                all[container].push({ count, color });
            }
        };
    }

    // console.log(JSON.stringify(all, null, 4));

    const mine = 'shiny gold';
    let valid = new Set();

    const bags = Object.keys(all);

    const isMineInBags = (bags, search) => {
        for (const bag of bags) {
            if (all[bag].some(d => d.color === search)) {
                // console.log(`${bag} can contain ${search}`);
                valid.add(bag);

                const parents = Object.keys(all).filter(d => all[d].some(i => i.color === bag));
                // console.log(parents);

                for (const parent of parents) {
                    // console.log(`${parent} can contain ${bag}`);
                    valid.add(parent);                    
                }

                isMineInBags(parents, bag);
            }
        }
    }

    isMineInBags(bags, mine);

    console.log(valid.size);
});