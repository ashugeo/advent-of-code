const data = require('./data.json')[1];

let wordsLetters = [];

for (let i = 0; i < data.length; i += 1) {
    word = data[i];

    let letters = word.split('');

    wordsLetters.push(letters)
}

for (let i = 0; i < wordsLetters.length; i += 1) {
    const candidate = wordsLetters[i];

    for (let j = 0; j < wordsLetters.length; j += 1) {
        const compare = wordsLetters[j];

        if (i === j) continue;

        let similar = 0;

        for (let l = 0; l < candidate.length; l += 1) {
            if (candidate[l] === compare[l]) {
                similar += 1;
            }
        }

        if (similar === candidate.length - 1) return console.log(candidate, compare);
    }
}

// Ended up comparing by hand (so lazy)
