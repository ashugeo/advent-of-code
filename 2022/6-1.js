const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  console.log(data);

  const letters = data.split('');

  for (const [i, letter] of letters.entries()) {
    // console.log(i, letter);

    const last4 = [letters[i], letters[i - 1], letters[i - 2], letters[i - 3]];
    const allDifferent = last4.every(
      (a) => last4.filter((b) => a === b).length === 1
    );

    if (allDifferent && i >= 4) {
      console.log(i + 1);
      break;
    }
  }
});
