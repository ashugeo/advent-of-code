const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  console.log(data);

  const letters = data.split('');

  for (const [i, letter] of letters.entries()) {
    // console.log(i, letter);

    let last14 = [];
    for (let d = 0; d < 14; d += 1) {
      last14.push(letters[i - d]);
    }
    const allDifferent = last14.every(
      (a) => last14.filter((b) => a === b).length === 1
    );

    if (allDifferent && i >= 4) {
      console.log(i + 1);
      break;
    }
  }
});
