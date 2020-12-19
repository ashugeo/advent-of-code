const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    [rules, data] = data.split('\n\n');
    data = data.split('\n');

    rules = rules.split('\n').reduce((acc, curr) => {
        acc[curr.split(':')[0]] = curr.split(': ')[1].replace(/"/g, '');
        return acc;
    }, {});

    // console.log(rules);
    rules['8'] = '42 | 42 8';
    rules['11'] = '42 31 | 42 11 31';

    while (Object.values(rules).filter(d => d.match(/\d/)).length > 3) {
        for (const id of Object.keys(rules)) {
            const rule = rules[id];

            if (!rule.match(/\d/)) {
                for (const _id of Object.keys(rules)) {
                    // if (_id === id) continue;
                    const _rule = rules[_id];

                    const re = new RegExp(`\\b${id}\\b`, 'g');
                    rules[_id] = _rule.replace(re, `(${rule})`);

                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/ /g, '');
                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/\(a\)/g, 'a');
                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/\(b\)/g, 'b');
                }
            }
        }
    }

    for (let i = 0; i < 5; i += 1) {
        rules['8'] = rules['8'].replace('8', rules['8']);
        rules['11'] = rules['11'].replace('11', rules['11']);
    }

    // console.log(rules);

    const re = new RegExp(`^(${rules[8].replace('8', '')})(${rules[11].replace('11', '')})$`);

    let valid = 0;
    for (const line of data) if (line.match(re)) valid += 1;

    console.log(valid);
});