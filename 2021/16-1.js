const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    data = data.trim();

    const binary = data.split('').map(d => parseInt(d, 16).toString(2).padStart(4, '0')).join('');

    let length;
    let currLength = 0;

    let number;
    let currNumber = 0;

    const versions = [];

    // 011000100000000010 00000000000000000101100001000101010110001011001000100000000010000100011000111000110100
    // VVVTTTILLLLLLLLLLL 
    //   3

    // 00000000000000000101100001000101010110001011001000100000000010000100011000111000110100
    // VVVTTTILLLLLLLLLLLLLLL
    //   0

    // 0001000101010110001011
    // VVVTTT


    const groupUp = (string, mode) => {

        console.log(`\nGrouping up ${string} with mode ${mode}`);
        const n = Math.floor(string.length / 5);
        const groups = [];
        
        for (let i = 0; i < n; i += 1) {
            const group = string.substring(i * 5, i * 5 + 5);
            groups.push(group);

            if (group.startsWith('0')) {                
                const value = parseInt(groups.map(d => d.substring(1)).join(''), 2);
                console.log({ value });
                
                if (mode === 'length') {
                    
                    const groupsLength = groups.join('').length;
                    const remaining = string.substring(groupsLength);

                    currLength += groupsLength + 6;

                    if (currLength === length) {
                        // console.log({remaining});
                        parse(remaining, mode);
                        break;
                    }

                    parse(remaining, mode);
                } else if (mode === 'number') {
                    currNumber += 1;
                    if (currNumber === number) break;

                    const groupsLength = groups.join('').length;
                    const remaining = string.substring(groupsLength);
                    parse(remaining, mode);
                }

                break;
            }
        }
    }

    const parse = (string, mode) => {
        console.log(`\nParsing ${string}\n`);
        
        const version = parseInt(string.substring(0, 3), 2);

        versions.push(version);
        const id = parseInt(string.substring(3, 6), 2);

        console.log({version});
        console.log({id});

        let bits = string.substring(6);

        // console.log(bits);

        if (id === 4) {
            // console.log(bits);

            groupUp(bits, mode);
        } else {
            const lengthTypeID = parseInt(bits[0]);
            bits = bits.substring(1);
            const n = [15, 11][lengthTypeID];

            if (n === 15) {
                length = parseInt(bits.substring(0, n), 2);
                console.log({length});
                
                const sub = bits.substring(n);
                parse(sub, 'length');
            } else if (n === 11) {
                number = parseInt(bits.substring(0, n), 2);
                console.log({number});

                const sub = bits.substring(n);
                parse(sub, 'number');
            }
        }
    }

    parse(binary);

    console.log(versions);
    console.log(versions.reduce((acc, curr) => acc + curr, 0));

    // 26
    // pb: length et number global alors qu'on devrait les passer
});
