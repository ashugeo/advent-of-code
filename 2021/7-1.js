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

    // let lowest = null;

    // for (let i = median - 10; i <= median + 10; i += 1) {
    //     const sum = data.reduce((acc, curr) => {
    //         const dist = Math.abs(curr - i);

    //         return acc + dist;
    //     }, 0);

    //     console.log(i, sum);
    //     if (!lowest || sum < lowest.sum) lowest = { pos: i, sum };
    // }

    // console.log(lowest);


    // Fun fact: the above was a waste of time because I submitted median instead of sum.
    // Below works just fine.
    const sum = data.reduce((acc, curr) => acc + Math.abs(curr - median), 0);
    console.log(sum);
});
