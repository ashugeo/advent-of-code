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

    let paths = {};

    for (const link of caves['start'].links) {
        paths[`start,${link}`] = false;
    }

    while (!Object.keys(paths).every(p => p.endsWith(',end'))) {

        for (const path of Object.keys(paths).filter(d => !d.endsWith(',end'))) {
            const lastID = path.split(',')[path.split(',').length - 1];
    
            const lastCave = caves[lastID];

            const single = paths[path] || path.split(',').some(d => d.toLowerCase() === d && path.split(d).length > 2);
            if (single) paths[path] = true;
    
            let nexts = lastCave.links.filter(d => !(caves[d].small && path.split(d).length > (single ? 1 : 2)) && d !== 'start');

            delete paths[path];

            // console.log(path, nexts);
    
            for (const next of nexts) {
                if (!paths[`${path},${next}`]) paths[`${path},${next}`] = false;
            }
        }
    }
    
    // console.log(paths);
    console.log(Object.keys(paths).length);
});
