const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    data = data.split('\n');
    data.pop();

    // console.log(entries);

    let entries = [];

    for (let d of data) {

        const time = d.split('] ')[0].replace('[', '').replace(/-/g, '').replace(' ', '').replace(':', '');
        let id;
        if (d.indexOf('#') > 1) id = d.split('#')[1].split(' ')[0];

        const status = d.split('] ')[1];
        entries.push({time, id, status});
    }

    entries.sort((a,b) => {
        return a.time - b.time;
    });

    let id = 0;
    for (let entry of entries) {
        if (entry.id) id = entry.id
        else entry.id = id;
    }

    let guards = {};

    for (let e = 0; e < entries.length; e += 1) {
        if (entries[e].status === 'falls asleep') {
            const start = parseInt(entries[e].time.slice(-2));
            const end = parseInt(entries[e + 1].time.slice(-2));

            for (let i = start; i < end; i += 1) {
                if (!guards[entries[e].id]) guards[entries[e].id] = {"minutes": []};
                if (!guards[entries[e].id].minutes[i]) guards[entries[e].id].minutes[i] = 0;
                guards[entries[e].id].minutes[i] += 1;
            }
        }
    }

    for (let guard of Object.keys(guards)) {
        const id = guard;
        const minutes = guards[guard].minutes;

        let total = 0;

        for (let min of Object.keys(minutes)) {
            total += minutes[min];
        }

        guards[id].total = total;
    }

    // let sleepiest = Object.keys(guards).reduce((a, b) => guards[a].total > guards[b].total ? a : b);

    console.log(guards);

    let max = 0;

    for (let guard of Object.keys(guards)) {
        const id = guard;
        for (let minute of Object.keys(guards[id].minutes)) {
            const slept = guards[id].minutes[minute];
            if (slept > max) max = slept;
        }
        console.log(id, guards[id].minutes.indexOf(max), max);
    }




    // console.log(guards[sleepiest].minutes.indexOf(max) * sleepiest);
});

// Ended up multiplying last result by hand (so lazy again)
