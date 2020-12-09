const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => parseInt(d));
    // console.log(data);

    const preamble = 25;

    let n = preamble + 1;
    while (n < data.length) {
        const x = data[n];
        let list = data.slice(n - preamble, n);

        const highest = Math.max(...list);
        list = list.filter(d => highest + d >= x);
        // console.log(x, list, highest);

        loop:
        for (let i = 0; i <= list.length - 1; i += 1) {
            for (let j = i + 1; j <= list.length; j += 1) {
                if (list[i] + list[j] === x) {
                    // console.log(`${list[i]} + ${list[j]} = ${list[i] + list[j]}`);
                    break loop;
                } else if (i === list.length - 1 && j === list.length) {
                    console.log(x);
                    return;
                }
            }
        }

        n += 1;
    }
});