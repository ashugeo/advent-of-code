const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    console.log(data);

    let oxygen = [...data];
    let co2 = [...data];

    for (let i = 0; i < data[0].length; i++) {
        let sum = 0;
        for (const line of oxygen) {
            if (line[i] === '1') sum += 1;
        }

        if (sum >= oxygen.length / 2) oxygen = oxygen.filter(d => d[i] === '1');
        else oxygen = oxygen.filter(d => d[i] === '0');

        if (oxygen.length === 1) break;
    }

    for (let i = 0; i < data[0].length; i++) {
        let sum = 0;
        for (const line of co2) {
            if (line[i] === '1') sum += 1;
        }

        if (sum < co2.length / 2) co2 = co2.filter(d => d[i] === '1');
        else co2 = co2.filter(d => d[i] === '0');

        if (co2.length === 1) break;
    }

    console.log(oxygen, co2);

    console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
});
