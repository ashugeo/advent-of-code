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

    // console.log(players);

    let games = 0;

    const playGame = (game, players) => {
        games += 1;

        console.log(`== Game ${game} ==`);

        const history = [];
        
        let round = 0;
        while (players[0].length && players[1].length) {
            round += 1;

            if (history.some(entry => entry[0] === players[0].join(',') && entry[1] === players[1].join(','))) {
                const winnerID = 0;
                console.log(`The winner of game ${game} is player ${winnerID + 1}!`);
                return winnerID;
            }
            
            history.push([players[0].join(','), players[1].join(',')]);
    
            console.log(`\n-- Round ${round} (Game ${game}) --`);
            console.log(`Player 1's deck: ${players[0].join(', ')}`);
            console.log(`Player 2's deck: ${players[1].join(', ')}`);
            console.log(`Player 1 plays: ${players[0][0]}`);
            console.log(`Player 2 plays: ${players[1][0]}`);
    
            let winnerID;
            if (
                players[0].length - 1 >= players[0][0] &&
                players[1].length - 1 >= players[1][0]
            ) {
                console.log('Playing a sub-game to determine the winner...\n');

                const copies = [];

                for (const [i, player] of players.entries()) {
                    const count = player[0];
                    const copy = [];
                    for (let n = 1; n <= count; n += 1) {
                        copy.push(player[n])
                    }
                    copies[i] = copy;
                }

                winnerID = playGame(games + 1, copies);
            } else {
                winnerID = players[0][0] > players[1][0] ? 0 : 1;
            }
    
            if (winnerID === 0) {
                console.log(`Player 1 wins round ${round} of game ${game}!`);
                players[0].push(players[0][0], players[1][0]);
            } else if (winnerID === 1) {
                console.log(`Player 2 wins round ${round} of game ${game}!`);
                players[1].push(players[1][0], players[0][0]);
            }
    
            players[0].shift();
            players[1].shift();
        }

        const winnerID = players[0].length > players[1].length ? 0 : 1;

        console.log(`The winner of game ${game} is player ${winnerID + 1}!`);

        if (game === 1) {
            console.log('\n== Post-game results ==');
            console.log(`Player 1's deck: ${players[0].join(', ')}`);
            console.log(`Player 2's deck: ${players[1].join(', ')}`);
        } else {
            console.log(`\n...anyway, back to game ${game - 1}.`);
        }

        return winnerID;
    }

    const winnerID = playGame(1, players);

    const score = players[winnerID].reduce((acc, curr, i) => {
        acc += curr * (players[winnerID].length - i);
        return acc;
    }, 0);
    
    console.log(score);
});

// 33642