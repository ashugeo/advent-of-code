const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    const string = data.split('\n')[0];
    let letters = string.split('');

    console.log(letters.length);

    let scan = true;
    while (scan) {
        let happened = false;
        for (let i = 0; i < letters.length; i += 1) {
            if (
                (
                    letters[i].toUpperCase() !== letters[i] &&
                    letters[i].toUpperCase() === letters[i+1]
                ) ||
                (
                    letters[i].toLowerCase() !== letters[i] &&
                    letters[i].toLowerCase() === letters[i+1]
                )
            ) {
                letters.splice(i, 2);
                happened = true;
            }
            if (happened) break;
        }
        scan = happened;
    }

    console.log(letters.length);
});
