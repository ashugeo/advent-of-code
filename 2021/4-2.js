const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split('\n\n');

    // console.log(data);

    let [numbers, ...boards] = [...data];
    numbers = numbers.split(',').map(d => parseInt(d));

    // console.log(numbers, boards);

    for (let [i, board] of boards.entries()) {
        const _board = board.split('\n').filter(d => d);
        boards[i] = _board.map((d, y) => d.split(/\s+/).filter(d => d).map((d, x) => ({ y, x, value: parseInt(d) })));
    }

    const won = [];

    for (const number of numbers) {
        for (const [b, board] of boards.entries()) {
            if (won.includes(b)) continue;

            const cell = board.find(row => row.some(c => c.value === number))?.find(c => c.value === number);

            if (cell) {
                cell.checked = true;

                if (
                    board[cell.y].every(c => c.checked) ||
                    board.every(col => col[cell.x].checked)
                ) {
                    const unmarked = board.flat().filter(d => !d.checked).reduce((acc, curr) => acc + curr.value, 0);

                    won.push(b);

                    console.log(unmarked * number);
                }
            }
        }
    }
});
