const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  data = data.trim();

  const pairs = data.split("\n");

  let total = 0;

  for (const pair of pairs) {
    let [a, b] = pair
      .split(",")
      .map((d) => d.split("-").map((n) => parseInt(n)))
      .map((arr) => {
        let str = [];
        let i = arr[0];
        while (i <= arr[1]) {
          str.push(i);
          i += 1;
        }
        return str;
      });

    // console.log(a, b);
    if (a.some((d) => b.includes(d))) total += 1;
  }

  console.log(total);
});
