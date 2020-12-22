const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n\n');
    // console.log(data);

    const players = data.map(d => {
        d = d.split('\n')
        d.shift();
        d = d.map(c => parseInt(c));
        return d;
    });

    console.log(players);
    let n = 0;
    while (players[0].length && players[1].length) {
        console.log(n);
        n += 1;

        console.log(`-- Round ${n} --`);
        console.log(`Player 1's deck: ${players[0].join(', ')}`);
        console.log(`Player 2's deck: ${players[1].join(', ')}`);
        console.log(`Player 1 plays: ${players[0][0]}`);
        console.log(`Player 2 plays: ${players[1][0]}`);

        
        if (players[0][0] > players[1][0]) {
            console.log('Player 1 wins the round!');
            players[0].push(players[0][0], players[1][0]);
        } else {
            console.log('Player 2 wins the round!');
            players[1].push(players[1][0], players[0][0]);
        }

        players[0].shift();
        players[1].shift();
    }

    console.log('');
    console.log('== Post-game results ==');
    console.log(`Player 1's deck: ${players[0].join(', ')}`);
    console.log(`Player 2's deck: ${players[1].join(', ')}`);

    const winner = players[0].length > players[1].length ? players[0] : players[1];

    const score = winner.reduce((acc, curr, i) => {
        acc += curr * (winner.length - i);
        return acc;
    }, 0);
    
    console.log(score);
});