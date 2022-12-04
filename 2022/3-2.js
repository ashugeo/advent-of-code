const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();

  const sacks = data.split("\n");
  console.log(sacks);

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let sum = 0;

  for (let i = 0; i < sacks.length; i += 3) {
    console.log(sacks[i], sacks[i + 1], sacks[i + 2]);

    const same = sacks[i]
      .split("")
      .find((d) => sacks[i + 1].includes(d) && sacks[i + 2].includes(d));

    console.log(same);
    sum +=
      alphabet.indexOf(same) + 1 ||
      alphabet.toUpperCase().indexOf(same.toUpperCase()) + 1 + 26;
  }

  console.log(sum);
});
