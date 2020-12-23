const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    const labels = data.split('').map(d => parseInt(d));

    const cups = {};

    for (const [i, label] of labels.entries()) {
        cups[label] = {
            next: labels[i + 1] || labels[0],
            prev: labels[i - 1] || labels[labels.length - 1]
        };
    }

    // console.log(cups);

    const highest = Math.max(...labels);

    const getOrder = label => {
        const order = [];
        
        while (!order.includes(label)) {
            order.push(label);
            label = cups[label].next;
        }

        return order;
    };
    
    const move = (curr, n = 1) => {
        const order = getOrder(curr);
        // console.log(order);

        const picks = [cups[curr].next, cups[cups[curr].next].next, cups[cups[cups[curr].next].next].next];
        // console.log(picks);

        let dest = curr - 1 === 0 ? highest : curr - 1;
        while (picks.includes(dest)) {
            dest -= 1;
            dest = dest === 0 ? highest : dest;
        }
        // console.log(dest);

        console.log(`\n-- move ${n} --`);
        console.log(`cups:  ${order.map(d => d === curr ? `(${d})` : d).join(' ')}`);
        console.log(`pick up: ${picks.join(' ')}`);
        console.log(`destination: ${dest}`);

        // console.log('');
        // console.log(curr, 'next:', cups[picks[picks.length - 1]].next);
        // console.log(cups[picks[picks.length - 1]].next, 'prev:', curr);
        // console.log('');
        // console.log(dest, 'next:', picks[0]);
        // console.log(picks[0], 'prev:', dest);
        // console.log('');
        // console.log(picks[picks.length - 1], 'next:', cups[dest].next);
        // console.log(cups[dest].next, 'prev:', picks[picks.length - 1]);

        cups[curr].next = cups[picks[picks.length - 1]].next;
        cups[cups[picks[picks.length - 1]].next].prev = curr;

        cups[picks[picks.length - 1]].next = cups[dest].next;
        cups[cups[dest].next].prev = picks[picks.length - 1];

        cups[dest].next = picks[0];
        cups[picks[0]].prev = dest;

        // console.log(cups);

        if (n < 100) move(cups[curr].next, n + 1);
    };

    move(3);

    const order = getOrder(cups[1].next);
    order.pop();
    console.log(order.join(''));
});

// 74938526 too low