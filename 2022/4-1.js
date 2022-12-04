const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();

  const pairs = data.split("\n");

  let total = 0;

  for (const pair of pairs) {
    let [a, b] = pair
      .split(",")
      .map((d) => d.split("-").map((n) => parseInt(n)));

    console.log(a, b);

    if ((a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]))
      total += 1;
  }

  console.log(total);
});
