const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();

  const sacks = data.split("\n");
  console.log(sacks);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let sum = 0;
  for (const sack of sacks) {
    const first = sack.substring(0, sack.length / 2);
    const second = sack.substring(sack.length / 2);

    console.log(first, second);

    const same = first.split("").find((letter) => second.includes(letter));
    console.log(same);

    sum +=
      alphabet.indexOf(same) + 1 ||
      alphabet.toUpperCase().indexOf(same.toUpperCase()) + 1 + 26;
  }

  console.log(sum);
});
