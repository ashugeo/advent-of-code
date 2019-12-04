const data = require('./data.json');

for (let i = 0; i < data.length; i += 4) {
    const opcode = data[i];

    if (opcode === 1) {
        data[data[i + 3]] = data[data[i + 1]] + data[data[i + 2]];
    } else if (opcode === 2) {
        data[data[i + 3]] = data[data[i + 1]] * data[data[i + 2]];
    } else if (opcode === 99) {
        return console.log(data);
    } else {
        console.log('error');
    }
}

console.log(data);
