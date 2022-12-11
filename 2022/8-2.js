const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const map = data.split('\n').map((d) => d.split('').map((i) => parseInt(i)));

  // console.log(map);

  const lookTo = (tree, x, y, i, j, seen = 0) => {
    const look = map[y]?.[x];

    if (look === undefined) return seen;
    if (look >= tree) return seen + 1;
    return lookTo(tree, x + i, y + j, i, j, seen + 1);
  };

  let max = 0;

  for (let y = 1; y < map[0].length - 1; y += 1) {
    for (let x = 1; x < map.length - 1; x += 1) {
      const tree = map[y][x];

      let seen = [];

      seen.push(lookTo(tree, x, y - 1, 0, -1));
      seen.push(lookTo(tree, x + 1, y, 1, 0));
      seen.push(lookTo(tree, x, y + 1, 0, 1));
      seen.push(lookTo(tree, x - 1, y, -1, 0));

      const allSeen = seen.reduce((acc, curr) => acc * curr, 1);
      // console.log({ x, y, tree, allSeen });

      if (allSeen > max) max = allSeen;
    }
  }

  console.log(max);
});
