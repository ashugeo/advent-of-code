const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    const string = data.split('\n')[0];
    let letters = string.split('');

    console.log(letters.length);

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet = alphabet.split('');

    let smallest = letters.length;

    for (let a of alphabet) {
        console.log(a, a.toUpperCase());
        let candidate = letters.filter((l) => { return l !== a; });
        candidate = candidate.filter((l) => { return l !== a.toUpperCase(); });

        let scan = true;
        while (scan) {
            let happened = false;
            for (let i = 0; i < candidate.length; i += 1) {
                if (
                    (
                        candidate[i].toUpperCase() !== candidate[i] &&
                        candidate[i].toUpperCase() === candidate[i+1]
                    ) ||
                    (
                        candidate[i].toLowerCase() !== candidate[i] &&
                        candidate[i].toLowerCase() === candidate[i+1]
                    )
                ) {
                    candidate.splice(i, 2);
                    happened = true;
                }
                if (happened) break;
            }
            scan = happened;
        }

        if (candidate.length < smallest) smallest = candidate.length;
    }

    console.log(smallest);
});

// This took several minutes to compute… oops :x
