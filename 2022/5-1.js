const fs = require("fs");

fs.readFile("./data.md", "utf8", (_, data) => {
  console.clear();
  // data = data.trim();

  let [crates, rules] = data.split("\n\n").map((d) => d.split("\n"));
  crates.pop();

  // console.log({ crates }, { rules });

  const lines = [];

  for (const line of crates) {
    // console.log(line);
    for (let i = 1; i < line.length; i += 4) {
      // console.log(line[i], Math.floor(i / 4));

      if (!lines[Math.floor(i / 4)]) lines[Math.floor(i / 4)] = "";
      if (line[i] !== " ") lines[Math.floor(i / 4)] += line[i];
    }
  }

  // console.log(lines);

  for (const rule of rules) {
    // console.log("---");
    const [_, move, from, to] = [
      ...rule.matchAll(/move (\d+) from (\d+) to (\d+)/g),
    ][0].map((d) => parseInt(d));

    // console.log(lines);
    const sub = lines[from - 1].substring(0, move).split("").reverse().join("");
    lines[from - 1] = lines[from - 1].slice(move);
    lines[to - 1] = `${sub}${lines[to - 1]}`;
    // console.log(lines);
  }

  // console.log(lines);

  let out = "";
  for (let line of lines) out += line[0];
  console.log(out);
});
