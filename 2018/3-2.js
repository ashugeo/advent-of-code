const data = require('./data.json')[0];

let claims = [];

for (let i = 0; i < data.length; i += 1) {
    const code = data[i];
    let grab = code.split('@ ')[1];

    const id = code.split(' @')[0];
    const x = parseInt(grab.split(',')[0]);
    const y = parseInt(grab.split(',')[1].split(':')[0]);
    const w = parseInt(grab.split(': ')[1].split('x')[0]);
    const h = parseInt(grab.split('x')[1]);

    claims.push({id, x, y, w, h});
}

// console.log(claims);

let fabric = [];

for (let claim of claims) {
    // console.log(claim);
    for (let y = claim.y; y < claim.y + claim.h; y += 1) {
        for (let x = claim.x; x < claim.x + claim.w; x += 1) {
            // console.log(x, y);
            if (!fabric[x]) fabric[x] = [];
            if (!fabric[x][y]) fabric[x][y] = 0;
            fabric[x][y] += 1;
        }
    }
}

for (let claim of claims) {
    // console.log(claim);
    let maybeThisOne = true;

    for (let y = claim.y; y < claim.y + claim.h; y += 1) {
        for (let x = claim.x; x < claim.x + claim.w; x += 1) {
            if (fabric[x][y] > 1) {
                maybeThisOne = false;
                break;
            }
        }
        if (!maybeThisOne) {
            break;
        }
    }

    if (maybeThisOne) {
        console.log(claim);
    }
}



// console.log(fabric);

// let overlaps = 0;
//
// for (let row of fabric) {
//     // console.log(row);
//     if (!row) continue;
//     for (let cell of row) {
//         if (cell > 1) overlaps += 1;
//     }
// }



// console.log(overlaps);
