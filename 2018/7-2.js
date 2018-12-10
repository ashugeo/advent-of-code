const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    let lines = data.split('\n');
    lines.pop();

    let steps = [];
    let code = '';

    let workers = [];

    for (let i = 1; i <= 5; i += 1) {
        workers.push({ id: i, step: '', secs: 0 });
    }

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

    let sec = 0;

    while (code.length < alphabet.length || !workers.every(x => x.secs === 0)) {
        let freeSteps = steps.filter(x => { return x.locks.length === 0 && !x.started });
        let freeWorkers = workers.filter(x => { return x.secs === 0 });

        for (let i = 0; i <= workers.length; i += 1) {
            if (freeWorkers[i] && freeSteps[i]) {
                freeSteps[i].started = true;
                freeWorkers[i].step = freeSteps[i].step;
                freeWorkers[i].secs = alphabet.indexOf(freeSteps[i].step) + 61;
            }
        }

        let log = `${sec < 10 ? '0' + sec : sec } | `;

        for (let worker of workers) {
            if (worker.secs === 1) {
                for (step of steps) {
                    step.locks = step.locks.filter(x => x !== worker.step);
                }
                code += worker.step;
            } else if (worker.secs === 0) {
                worker.step = '.';
            }

            if (worker.secs > 0) {
                worker.secs -= 1;
            }

            log += `#${worker.id}: ${worker.step === '' ? '.' : worker.step } (${worker.secs}s) | `;
        }

        console.log(log);
        sec += 1;
    }

    console.log(sec, code);
});
