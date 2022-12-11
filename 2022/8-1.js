const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  const map = data
    .split('\n')
    .map((d) => d.split('').map((i) => ({ seen: false, val: parseInt(i) })));

  // console.log(map);

  let visible = 0;

  // LTR
  console.log('ltr');
  for (let y = 0; y < map[0].length; y += 1) {
    let max = -1;

    for (let x = 0; x < map.length; x += 1) {
      const tree = map[y][x];
      // console.log({ x, y, tree });

      if (tree.val > max) {
        max = tree.val;
        visible += !tree.seen;
        tree.seen = true;
      }
    }
  }

  // RTL
  console.log('rtl');
  for (let y = 0; y < map[0].length; y += 1) {
    let max = -1;

    for (let x = map.length - 1; x >= 0; x -= 1) {
      const tree = map[y][x];
      // console.log({ x, y, tree });

      if (tree.val > max) {
        max = tree.val;
        visible += !tree.seen;
        tree.seen = true;
      }
    }
  }

  // TTB
  console.log('ttb');
  for (let x = 0; x < map[0].length; x += 1) {
    let max = -1;

    for (let y = 0; y < map.length; y += 1) {
      const tree = map[y][x];
      // console.log({ x, y, tree });

      if (tree.val > max) {
        max = tree.val;
        visible += !tree.seen;
        tree.seen = true;
      }
    }
  }

  // BTT
  console.log('btt');
  for (let x = 0; x < map[0].length; x += 1) {
    let max = -1;

    for (let y = map.length - 1; y > 0; y -= 1) {
      const tree = map[y][x];
      // console.log({ x, y, tree });

      if (tree.val > max) {
        max = tree.val;
        visible += !tree.seen;
        tree.seen = true;
      }
    }
  }

  console.log(visible);
});
