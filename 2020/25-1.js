const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    const [cardPublicKey, doorPublicKey] = data.split('\n').map(d => parseInt(d));

    // console.log(cardPublicKey, doorPublicKey);
    
    const getLoopSize = key => {
        let i = 0;
        let n = 1;
        while (n !== key) {
            n *= 7;
            n %= 20201227;
            i += 1;
        }
        return i;
    }

    const transform = (key, n) => {
        let res = 1;
        for (let i = 0; i < n; i += 1) {
            res *= key;
            res %= 20201227;
        }

        return res;
    }

    const cardLoopSize = getLoopSize(cardPublicKey);

    // console.log(cardLoopSize, doorLoopSize);

    const encryptionKey = transform(doorPublicKey, cardLoopSize);

    console.log(encryptionKey);
});