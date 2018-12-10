const data = require('./data.json')[1];

let twice = 0;
let threeTimes = 0;

for (let i = 0; i < data.length; i += 1) {
    word = data[i];

    let letters = word.split('');

    let count = {};

    for (let letter of letters) {
        if (!count[letter]) {
            count[letter] = 1;
        } else {
            count[letter] += 1;
        }
    }


    for (let letter of Object.keys(count)) {
        if (count[letter] === 2) {
            twice += 1;
            break;
        }
    }

    for (let letter of Object.keys(count)) {
        if (count[letter] === 3) {
            threeTimes += 1;
            break;
        }
    }
}
console.log(twice, threeTimes, twice * threeTimes);
