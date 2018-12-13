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
    console.log(x / 3 + '%');
    for (let y = 1; y <= 300; y += 1) {
        for (let l = 0; l < Math.min(300 - x, 300 - y); l += 1) {
            let total = 0;

            for (let i = 0; i <= l; i += 1) {
                for (let j = 0; j <= l; j += 1) {
                    if (board[x + i] && board[x + i][y + j]) total += board[x + i][y + j];
                }
            }

            if (total > highest.total) highest = {x, y, l: l + 1, total};
        }
    }
}

console.log(highest);
