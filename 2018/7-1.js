const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    let lines = data.split('\n');
    lines.pop();

    let steps = [];
    let code = '';

    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    for (let letter of alphabet) {
        steps.push({ step: letter, locks: []});
    }

    for (let line of lines) {
        let step = line.split('step ')[1].split(' can')[0];
        let lock = line.split('Step ')[1].split(' must')[0];

        steps.find(x => { return x.step === step }).locks.push(lock);
    }

    steps.sort((a, b) => a.step.localeCompare(b.step));

    while (code.length < alphabet.length) {
        const free = steps.filter(x => { return x.locks.length === 0 && !x.used })[0];
        free.used = true;
        code += free.step;

        for (step of steps) {
            step.locks = step.locks.filter(x => x !== free.step);
        }
    }

    console.log(code);
});
