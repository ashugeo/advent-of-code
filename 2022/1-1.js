const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();
  // console.log(data);

  const elves = data
    .split("\n\n")
    .map((d) => d.split("\n").map((n) => parseInt(n)))
    .map((d) => d.reduce((acc, curr) => acc + curr, 0));

  console.log(elves);
  console.log(Math.max(...elves));
});
