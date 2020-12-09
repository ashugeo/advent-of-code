const { time } = require('console');
const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    console.clear();
    // console.log(data);

    const prog = [];

    for (const [id, ins] of data.entries()) {
        let [ope, arg] = ins.split(' ');
        arg = parseInt(arg);
        // console.log(ope, arg);
        prog.push({ id, ope, arg });
    }

    // console.log(prog);

    let timeline = [];
    let _prog;

    const buildTimeline = (i, change) => {
        let ins = _prog[i];
        if (!ins) return;

        let { ope, arg, done } = ins;

        if (done) return;

        if (i === change) {
            if (ope === 'jmp') {
                ope = 'nop';
                _prog[i].ope = 'nop';
            } else if (ope === 'nop') {
                ope = 'jmp';
                _prog[i].ope = 'jmp';
            }
        }

        timeline.push(ins);

        ins.done = true;

        if (ope === 'jmp') buildTimeline(i + arg, change);
        else buildTimeline(i + 1, change);
    }

    let change = 0;
    while (change < prog.length) {
        timeline = [];
        _prog = JSON.parse(JSON.stringify(prog));

        if (prog[change].ope === 'jmp' || prog[change].ope === 'nop') {
            // console.log({change});
            buildTimeline(0, change);

            if (timeline[timeline.length - 1].id === prog[prog.length - 1].id) break;
        }

        change += 1;
    }

    // console.log(timeline);

    const total = timeline.reduce((acc, curr) => curr.ope === 'acc' ? acc + curr.arg : acc, 0);
    console.log(total);
});