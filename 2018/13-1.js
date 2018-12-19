const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    let lines = data.split('\n');
    lines.pop();

    let map = [];

    for (let line of lines) {
        map.push(line.split(''));
    }

    let carts = [];

    const turns = ['left', 'straight', 'right'];
    const dirs = ['^', '>', 'v', '<'];

    for (let row = 0; row < map.length; row += 1) {
        for (let col = 0; col < map[row].length; col += 1) {
            const cell = map[row][col];

            const arrows = ['>', 'v', '<', '^'];
            if (arrows.indexOf(cell) > -1) {
                carts.push({dir: cell, x: col, y: row, turn: turns[0]});
                if (cell === '>' || cell === '<') {
                    map[row][col] = '-';
                } else if (cell === '^' || cell === 'v') {
                    map[row][col] = '|';
                }
            }
        }
    }

    let frame = 0;
    while (true) {
        frame += 1;
        for (let cart of carts) {
            const cell = map[cart.y][cart.x];

            if (cell === '|') {
                if (cart.dir === '^') {
                    cart.y = cart.y - 1;
                } else if (cart.dir === 'v') {
                    cart.y = cart.y + 1;
                }
            } else if (cell === '-') {
                if (cart.dir === '<') {
                    cart.x = cart.x - 1;
                } else if (cart.dir === '>') {
                    cart.x = cart.x + 1;
                }
            } else if (cell === '\\') {
                if (cart.dir === '>') {
                    cart.dir = 'v';
                    cart.y = cart.y + 1;
                } else if (cart.dir === 'v') {
                    cart.dir = '>';
                    cart.x = cart.x + 1;
                } else if (cart.dir === '<') {
                    cart.dir = '^';
                    cart.y = cart.y - 1;
                } else if (cart.dir === '^') {
                    cart.dir = '<';
                    cart.x = cart.x - 1;
                }
            } else if (cell === '/') {
                if (cart.dir === '>') {
                    cart.dir = '^';
                    cart.y = cart.y - 1;
                } else if (cart.dir === 'v') {
                    cart.dir = '<';
                    cart.x = cart.x - 1;
                } else if (cart.dir === '<') {
                    cart.dir = 'v';
                    cart.y = cart.y + 1;
                } else if (cart.dir === '^') {
                    cart.dir = '>';
                    cart.x = cart.x + 1;
                }
            } else if (cell === '+') {
                if (cart.turn === 'left') {
                    cart.dir = dirs[(dirs.indexOf(cart.dir) - 1 + dirs.length) % dirs.length];
                } else if (cart.turn === 'right') {
                    cart.dir = dirs[(dirs.indexOf(cart.dir) + 1) % dirs.length];
                }

                if (cart.dir === '^') {
                    cart.y = cart.y - 1;
                } else if (cart.dir === 'v') {
                    cart.y = cart.y + 1;
                } else if (cart.dir === '<') {
                    cart.x = cart.x - 1;
                } else if (cart.dir === '>') {
                    cart.x = cart.x + 1;
                }

                cart.turn = turns[(turns.indexOf(cart.turn) + 1) % turns.length];
            }
        }

        for (let cart of carts) {
            cartsHere = carts.filter(c => c.x === cart.x && c.y === cart.y);
            if (cartsHere.length > 1) {
                return console.log('crash at frame', frame, '@', cart.x, cart.y)
            }
        }
    }

    // console.log(map);
});
