const fs = require('fs');
console.clear();

fs.readFile('./data.md', 'utf8', (_, data) => {
    data = data.split(',').map(d => parseInt(d.trim()));

    // console.log(data);

    // Median function from https://stackoverflow.com/questions/45309447/calculating-median-javascript
    function getMedian(numbers) {
        const sorted = numbers.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }

        return sorted[middle];
    }

    const median = getMedian(data);

    let lowest = null;

    for (let i = median - 100; i <= median + 1000; i += 1) {
        const sum = data.reduce((acc, curr) => {
            let dist = Math.abs(curr - i);

            // https://stackoverflow.com/questions/29549836/how-to-find-the-sum-of-all-numbers-between-1-and-n-using-javascript
            dist = (dist * (dist + 1)) / 2;

            return acc + dist;
        }, 0);

        console.log(i, sum);
        if (!lowest || sum < lowest.sum) lowest = { pos: i, sum };
    }

    console.log(lowest);
});
