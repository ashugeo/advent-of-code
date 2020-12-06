const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n\n').map(d => d.replace(/\n/g, ' '));
    // console.log(data);

    let allAnswered = 0;

    for (const group of data) {
        const people = group.split(' ');
        // console.log(people);

        const answered = [];
        for (const person of people) {
            for (const question of person) {
                // console.log(question);
                if (!answered.includes(question)) answered.push(question);
            }
        }

        allAnswered += answered.length;
    }

    console.log(allAnswered);
});