const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n\n').map(d => d.replace(/\n/g, ' '));
    // console.log(data);

    let allAnswered = 0;

    for (const group of data) {
        const people = group.split(' ');

        const questions = [...new Set(group.split('').filter(d => d !== ' '))];

        for (const question of questions) {
            if (people.every(d => d.includes(question))) allAnswered += 1;
        }
    }

    console.log(allAnswered);
});