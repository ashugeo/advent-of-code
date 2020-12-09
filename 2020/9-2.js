const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n').map(d => parseInt(d));
    // console.log(data);

    const preamble = 25;
    const weakness = 69316178;

    let n = preamble;
    while (n < data.length) {
        const x = data[n];
        // console.log({x});

        let list = data.slice(n - preamble, n);
        // console.log(list);

        for (let i = 0; i < list.length - 1; i += 1) {
            let j = 1;
            let sublist = list.slice(i, i + j);
            // console.log(sublist);

            let sum = sublist.reduce((acc, curr) => acc + curr, 0);
            while (sum !== weakness && j < list.length) {
                j += 1;
                sublist = list.slice(i, j);
                // console.log(sublist);

                sum = sublist.reduce((acc, curr) => acc + curr, 0);
                // console.log(sum);

                if (sum > weakness) break;
            }

            if (sum === weakness) {
                // console.log({sublist});
                const lowest = Math.min(...sublist);
                const highest = Math.max(...sublist);
                console.log(lowest + highest);

                return;
            }
        }

        n += 1;
    }
});