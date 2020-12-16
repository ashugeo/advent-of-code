const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n\n');
    // console.log(data);

    let [fields, ticket, nearby] = data;

    fields = fields.split('\n').reduce((acc, curr) => {
        acc[curr.split(':')[0]] = curr.split(': ')[1].split(' or ');
        return acc;
    }, {});
    // console.log(fields);

    const allRanges = [];
    for (const [field, ranges] of Object.entries(fields)) {
        for (const range of ranges) {
            const [min, max] = range.split('-').map(d => parseInt(d));
            allRanges.push([min, max]);
        }
    }
    // console.log(allRanges);

    nearby = nearby.split('\n');
    nearby.shift();
    const values = nearby.map(d => d.split(',').map(e => parseInt(e))).flat();
    // console.log(nearby);

    let errors = 0;
    for (const value of values) {
        // console.log(value);
        if (!allRanges.some(range => value >= range[0] && value <= range[1])) errors += value;
    }
    console.log(errors);
});