const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);
    
    let mem = [];
    let mask;

    for (const ins of data) {
        if (ins.startsWith('mask')) {
            mask = ins.split(' = ')[1];
            continue;
        }

        const i = parseInt(ins.split('mem[')[1].split(']')[0]);
        let value = parseInt(ins.split(' = ')[1]).toString(2).padStart(mask.length, '0').split('');

        for (const [n, bit] of mask.split('').entries()) if (bit === '1' || bit === '0') value[n] = bit;
        mem[i] = parseInt(value.join(''), 2);
    }

    const sum = mem.reduce((acc, curr) => acc + curr, 0);
    console.log(sum);
});