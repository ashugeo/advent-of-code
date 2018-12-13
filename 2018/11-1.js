const serial = 9445;

let board = [];

for (let x = 1; x <= 300; x += 1) {
    board[x] = [];
    for (let y = 1; y <= 300; y += 1) {
        board[x][y] = Math.floor(((x + 10) * y + serial) * (x + 10) / 100) % 10 - 5;
    }
}

let totals = [];
let highest = {total: 0};

for (let x = 1; x <= 300; x += 1) {
    totals[x] = [];
    for (let y = 1; y <= 300; y += 1) {
        let total = 0;

        if (board[x - 1] && board[x - 1][y - 1]) total += board[x - 1][y - 1];
        if (board[x - 1] && board[x - 1][y]) total += board[x - 1][y];
        if (board[x - 1] && board[x - 1][y + 1]) total += board[x - 1][y + 1];
        if (board[x][y - 1]) total += board[x][y - 1];
        if (board[x][y + 1]) total += board[x][y + 1];
        if (board[x + 1] && board[x + 1][y - 1]) total += board[x + 1][y - 1];
        if (board[x + 1] && board[x + 1][y]) total += board[x + 1][y];
        if (board[x + 1] && board[x + 1][y + 1]) total += board[x + 1][y + 1];

        total += board[x][y];
        totals[x][y] = total;

        if (total > highest.total) highest = {x, y, total};
    }
}

console.log(highest.x - 1, highest.y - 1);
