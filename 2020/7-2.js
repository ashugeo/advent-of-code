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

    let total = 0;

    const bagsInBag = (bag, count) => {
        const bags = all[bag] || [];

        // console.log(bags);

        const sum = bags.map(d => d.count).reduce((acc, curr) => acc + curr, 0);
        // console.log(sum);
        
        // console.log(count, sum);

        total += count * sum;
        
        for (const bag of bags) {
            bagsInBag(bag.color, bag.count * count);
        }
    }

    bagsInBag(mine, 1);

    console.log(total);
});