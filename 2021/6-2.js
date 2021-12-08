const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split(',').map(d => parseInt(d.trim()));

    let groups = [];

    for (const life of data) {
        const group = groups.find(d => d.life === life);
        if (!group) groups.push({ life, fishes: 1 });
        else group.fishes += 1;
    }

    // console.log(groups);

    for (let day = 0; day < 256; day += 1) {

        const _groups = [...groups];

        for (const group of _groups) {
            group.life -= 1;
            if (group.life === -1) groups.push({ life: 8, fishes: group.fishes });
        }

        const renew = groups.find(g => g.life === -1);
        if (renew) {
            if (groups.some(g => g.life === 6)) groups.find(g => g.life === 6).fishes += renew.fishes;
            else groups.push({ life: 6, fishes: renew.fishes });
        }

        groups = groups.filter(g => g.life >= 0);
        
        const count = groups.reduce((acc, curr) => acc + curr.fishes, 0);

        console.log(`After ${day + 1} days: ${count} fishes`);
        // console.log(groups);
    }
});
