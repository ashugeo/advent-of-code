const data = require('./data.json');

let total = 0;
for (const module of data) {
    let subtotal = 0;

    let fuel = Math.floor(module / 3) - 2;
    subtotal += fuel;

    while (fuel > 0) {
        fuel = Math.floor(fuel / 3) - 2;
        if (fuel > 0) subtotal += fuel;
    }

    total += subtotal;
}
console.log(total);
