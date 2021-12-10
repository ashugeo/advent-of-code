const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n').filter(d => d);

    let total = 0;

    for (const line of data) {
        let [patterns, outputs] = line.split(' | ');
        patterns = patterns.split(' ');
        outputs = outputs.split(' ');

        //    8     5      2     3    7    9      6     4     0     1

        // acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab

        //  7   4    1
        // dab eafb ab

        // fbcad -> fc
        // 4: eafb -> f en commun donc au milieu
        // -> donc e en haut à gauche
        // fbcad -> 3 (car a et b)
        // -> donc c en bas
        // -> donc cdfbe = 5 (car le seul avec cdfe et a ou b)
        // -> donc b en bas à droite
        // -> donc a en haut à droite
        // -> donc reste seulement g en bas à gauche

        //  dddd
        // e    a
        //  ffff
        // g    b
        //  cccc

        //  0000
        // 5    1
        //  6666
        // 4    2
        //  3333

        let layout = [];

        const one = patterns.find(d => d.length === 2);
        const four = patterns.find(d => d.length === 4);
        const seven = patterns.find(d => d.length === 3);
        const eight = patterns.find(d => d.length === 7);

        layout[0] = seven.split('').find(x => !one.split('').includes(x));

        const three = patterns.find(p => seven.split('').every(x => p.includes(x) && p.length === 5));

        layout[6] = three.split('').find(x => four.includes(x) && !one.includes(x));

        layout[5] = four.split('').find(x => x !== layout[6] && !one.includes(x));

        layout[3] = three.split('').find(x => x !== layout[6] && !seven.includes(x));

        const five = patterns.find(p => p.length === 5 && [0, 3, 5, 6].every(i => p.includes(layout[i])));

        layout[2] = five.split('').find(x => !layout.includes(x));
        layout[1] = one.split('').find(x => x !== layout[2]);
        layout[4] = eight.split('').find(x => !layout.includes(x));
        
        const zero = [0, 1, 2, 3, 4, 5].map(i => layout[i]).join('');
        const six = [0, 2, 3, 4, 5, 6].map(i => layout[i]).join('');

        let value = '';
        for (const output of outputs) {
            // console.log(output);
            if (output.length === 2) value += 1;
            else if (output.length === 3) value += 7;
            else if (output.length === 4) value += 4;
            else if (output.length === 5) {
                if (output.split('').every(x => three.includes(x))) value += 3;
                else if (output.split('').every(x => five.includes(x))) value += 5;
                else value += 2;
            } else if (output.length === 6) {
                if (output.split('').every(x => zero.includes(x))) value += 0;
                else if (output.split('').every(x => six.includes(x))) value += 6;
                else value += 9;
            } else if (output.length === 7) value += 8;
        }
        // console.log(value);
        total += parseInt(value);
    }
    console.log(total);
});
