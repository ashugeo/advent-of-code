const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    console.clear();
    // console.log(data);

    const prog = [];

    for (const ins of data) {
        let [ope, arg] = ins.split(' ');
        arg = parseInt(arg);
        // console.log(ope, arg);
        prog.push({ ope, arg });
    }
    // console.log(prog);

    let timeline = [];

    const buildTimeline = i => {
        const ins = prog[i];
        const { ope, arg, done } = ins;
        if (done) return;

        timeline.push(ins);

        ins.done = true;

        if (ope === 'jmp') buildTimeline(i + arg);
        else buildTimeline(i + 1);
    }

    buildTimeline(0);

    // console.log(timeline);

    const total = timeline.reduce((acc, curr) => curr.ope === 'acc' ? acc + curr.arg : acc, 0);
    console.log(total);
});