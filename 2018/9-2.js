const players = 431;
const last = 7095000;

let currentMarble = 0;
let circle = [currentMarble];
let spot = 0;
let player = 0;
let scores = [];

for (let i = 0; i < last; i += 1) {
    console.log(i / last * 100 + '%');
    player += 1;
    if (player > players) player = 1;

    currentMarble += 1;

    if (currentMarble % 23 === 0) {
        if (!scores[player]) scores[player] = 0;
        scores[player] += currentMarble;

        spot -= 7;
        if (spot < 0) spot += circle.length;

        scores[player] += circle[spot];

        circle.splice(spot, 1);
    } else {
        if (currentMarble === 1) spot = 1;
        else spot += 2

        if (spot > circle.length) spot = spot % circle.length;

        circle.splice(spot, 0, currentMarble);
    }
}

console.log(scores.reduce((a, b) => Math.max(a, b)));

// Part 2 : team lazy… ran it for three hours
