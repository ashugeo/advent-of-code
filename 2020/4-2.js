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

        // console.log(passport);

        if (Object.keys(passport).length < 7) continue;

        const byr = parseInt(passport.byr);
        if (byr < 1920 || byr > 2002) continue;
        // console.log('byr valid');

        const iyr = parseInt(passport.iyr);
        if (iyr < 2010 || iyr > 2020) continue;
        // console.log('iyr valid');

        const eyr = parseInt(passport.eyr);
        if (eyr < 2020 || eyr > 2030) continue;
        // console.log('eyr valid');

        const hgt = parseInt(passport.hgt);
        if (passport.hgt.endsWith('cm') && (hgt < 150 || hgt > 193)) continue;
        else if (passport.hgt.endsWith('in') && (hgt < 59 || hgt > 76)) continue;
        else if (!passport.hgt.endsWith('cm') && !passport.hgt.endsWith('in')) continue;
        // console.log('hgt valid');

        const hcl = passport.hcl;
        if (hcl.length !== 7 || !(/#[a-f0-9]{6}/.test(hcl))) continue;
        // console.log('hcl valid');

        const ecl = passport.ecl;
        if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)) continue;
        // console.log('ecl valid');

        const pid = passport.pid;
        if (pid.length !== 9) continue;
        // console.log('pid valid');

        valid += 1;
    }

    console.log(valid);
});