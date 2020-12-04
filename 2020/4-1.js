const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n\n').map(d => d.replace(/\n/g, ' '));
    // console.log(data);

    let valid = 0;

    const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    // const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];

    for (let passport of data) {
        passport = passport.split(' ').reduce((acc, curr) => {
            acc[curr.split(':')[0]] = curr.split(':')[1];
            return acc;
        }, {});
        delete passport.cid;
        console.log(passport);

        if (Object.keys(passport).length > 6) valid += 1;
    }

    console.log(valid);
});