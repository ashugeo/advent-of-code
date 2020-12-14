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

        const value = parseInt(ins.split(' = ')[1]);
        const address = parseInt(ins.split('mem[')[1].split(']')[0]).toString(2).padStart(mask.length, '0');
        let result = address.split('');

        for (const [i, bit] of mask.split('').entries()) if (bit === '1' || bit === 'X') result[i] = bit;

        // console.log(result.join(''));

        const nBin = '1'.repeat(result.join('').match(/X/g).length);
        const n = parseInt(nBin, 2) + 1;

        for (let i = 0; i < n; i += 1) {
            const bin = i.toString(2).padStart(nBin.length, '0');
            let _address = [...result];

            for (const bit of bin.split('')) _address[_address.join('').search(/X/g)] = bit;

            _address = parseInt(_address.join(''), 2);
            mem[_address] = value;
        }
    }


    const sum = Object.values(mem).reduce((acc, curr) => acc + curr, 0);
    console.log(sum);
});