const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    [rules, data] = data.split('\n\n');
    data = data.split('\n');

    rules = rules.split('\n').reduce((acc, curr) => {
        acc[curr.split(':')[0]] = curr.split(': ')[1].replace(/"/g, '');
        return acc;
    }, {});

    while (Object.values(rules).filter(d => d.match(/\d/)).length > 3) {
        for (const id of Object.keys(rules)) {
            const rule = rules[id];

            if (!rule.match(/\d/)) {
                for (const _id of Object.keys(rules)) {
                    const _rule = rules[_id];

                    const re = new RegExp(`\\b${id}\\b`, 'g');
                    rules[_id] = _rule.replace(re, `(?:${rule})`);

                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/ /g, '');
                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/\(\?\:a\)/g, 'a');
                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/\(\?\:b\)/g, 'b');
                }
            }
        }
    }

    rules['8'] = `((?:${rules['42']})+)`;
    rules['11'] = `((?:${rules['42']})+)((?:${rules['31']})+)`;
    
    // console.log(rules);

    const re0 = new RegExp(`^${rules['8']}${rules['11']}$`);
    const re42 = new RegExp(rules['42'], 'g');
    const re31 = new RegExp(rules['31'], 'g');

    // console.log(re0);

    let valid = 0;

    for (const line of data) {
        const m = line.match(re0);
        if (m && m[1].match(re42).length - (m[3].match(re31).length - m[2].match(re42).length) > 0) valid += 1;
    }

    console.log(valid);
});