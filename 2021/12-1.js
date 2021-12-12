const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', async (_, data) => {
    data = data.trim().split('\n');

    // console.log(data);

    const caves = {};

    const newCave = (id) => {
        if (!caves[id]) {
            caves[id] = {
                small: id === id.toLowerCase(),
                links: []
            };
        }
    }

    const linkCaves = (a, b) => {
        caves[a].links.push(b);
        caves[b].links.push(a);
    }

    for (const line of data) {
        const [a, b] = line.split('-');

        newCave(a);
        newCave(b);

        linkCaves(a, b);
    }

    // console.log(caves);

    let paths = [];

    for (const link of caves['start'].links) {
        paths.push(`start,${link}`);
    }

    while (!paths.every(p => p.endsWith(',end'))) {
        const _paths = [...paths];

        for (const path of _paths) {
            // console.log(path);
    
            const lastID = path.split(',')[path.split(',').length - 1];
            if (lastID === 'end') continue;
    
            const lastCave = caves[lastID];
    
            const nexts = lastCave.links.filter(d => !(caves[d].small && path.includes(d)));

            paths.splice(paths.indexOf(path), 1);
    
            for (const next of nexts) {
                if (!paths.includes(`${path},${next}`)) paths.push(`${path},${next}`);
            }
        }
    }
    
    // console.log(paths);
    console.log(paths.length);
});
