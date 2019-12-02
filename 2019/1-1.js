const data = require('./data.json');

let total = 0;
for (const module of data) {
    total += Math.floor(module / 3) - 2;
}
console.log(total);
