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
    // console.log(nearby);

    loop:
    for (const [i, ticket] of nearby.entries()) {
        const values = ticket.split(',').map(e => parseInt(e));

        for (const value of values) {
            const notValid = !allRanges.some(range => value >= range[0] && value <= range[1]);
            if (notValid) {
                delete nearby[i];
                continue loop;
            }
        }
    }

    nearby = nearby.filter(d => d).map(d => d.split(',').map(f => parseInt(f)));
    // console.log({nearby});

    const isInRanges = (value, ranges) => ranges.some(range => value >= range[0] && value <= range[1]);

    let allFields = {};

    for (let [field, ranges] of Object.entries(fields)) {
        ranges = ranges.map(d => d.split('-').map(f => parseInt(f)));
        // console.log(field, {ranges});

        for (let i = 0; i < nearby[0].length; i += 1) {
            if (nearby.every(ticket => isInRanges(ticket[i], ranges))) {
                if (!allFields[field]) allFields[field] = [];
                allFields[field].push(i);
            }
        }
    }

    allFields = Object.keys(allFields).reduce((acc, curr) => {
        acc.push({ name: curr, indexes: allFields[curr]})
        return acc;
    }, [])
    .sort((a, b) => a.indexes.length - b.indexes.length);

    for (let i = 0; i < allFields.length; i += 1) {
        const index = allFields[i].indexes[0];

        for (let j = i + 1; j < allFields.length; j += 1) {
            allFields[j].indexes.splice(allFields[j].indexes.indexOf(index), 1);
        }
    }
    console.log(allFields);

    ticket = ticket.split('\n');
    ticket.shift();
    ticket = ticket[0].split(',').map(d => parseInt(d));

    console.log(allFields.filter(d => d.name.startsWith('departure')).reduce((acc, curr) => acc * ticket[curr.indexes[0]], 1))
});