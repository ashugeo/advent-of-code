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

    while (Object.values(rules).some(d => d.match(/\d/))) {
        for (const id of Object.keys(rules)) {
            const rule = rules[id];

            if (!rule.match(/\d/)) {
                for (const _id of Object.keys(rules)) {
                    if (_id === id) continue;
                    const _rule = rules[_id];

                    const re = new RegExp(`\\b${id}\\b`, 'g');
                    rules[_id] = _rule.replace(re, `(${rule})`);

                    if (!rules[_id].match(/\d/)) rules[_id] = rules[_id].replace(/ /g, '');
                }
            }
        }
    }

    // console.log(rules);

    const re = new RegExp(`^${rules[0]}$`);

    let valid = 0;
    for (const line of data) if (line.match(re)) valid += 1;

    console.log(valid);
});