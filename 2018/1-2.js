const data = require('./data.json')[0];

let freq = 0;
let old = [];

for (let i = 0; i < data.length; i += 1) {
    freq += data[i];

    if (old.indexOf(freq) > 0) {
        return console.log(freq);
    } else {
        old.push(freq);
    }

    if (i === data.length - 1) i = -1;
}
