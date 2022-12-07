const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  // '/': {
  //   a: {
  //     e: {
  //       i: 584,
  //     },
  //     f: 29116,
  //     g: 2557,
  //     h: 62596,
  //   },
  //   ...
  // },

  const tree = { '/': {} };
  const path = [];

  const blocks = [];
  for (const line of data.split('\n')) {
    if (line.startsWith('$')) {
      blocks.push([]);
    }

    blocks[blocks.length - 1].push(line);
  }

  // console.log(blocks);

  const toTree = (item) => {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];

    const dir = eval(`tree['${path.join("']['")}']`);

    if (typeof value === 'string') dir[key] = parseInt(value);
    else dir[key] = {};
  };

  for (let block of blocks) {
    const [_, cmd, dir] = block[0].split(' ');

    if (cmd === 'cd') {
      if (dir === '..') {
        path.pop();
      } else {
        path.push(dir);
      }
      // console.log(cmd, dir);
    } else if (cmd === 'ls') {
      block.shift();

      for (const item of block) {
        const [a, b] = item.split(' ');

        if (a === 'dir') toTree({ [b]: {} });
        else toTree({ [b]: a });
      }
    }
  }

  //   console.log(JSON.stringify(tree, null, 4));

  let rootSize;
  let sums = [];

  const getSize = (path) => {
    const dir = eval(`tree['${path.join("']['")}']`);

    const sum = JSON.stringify(dir)
      .match(/\d+/g)
      .reduce((acc, curr) => acc + parseInt(curr), 0);

    for (const [key, val] of Object.entries(dir)) {
      if (typeof val === 'object') {
        let _path = JSON.parse(JSON.stringify(path));
        _path.push(key);
        getSize(_path);
      }
    }

    if (path.length === 1) rootSize = sum;
    sums.push(sum);
  };

  getSize(['/']);

  console.log({ sums });
  console.log({ rootSize });

  const needed = 30000000 - (70000000 - rootSize);
  console.log({ needed });

  sums = sums.sort((a, b) => a - b).filter((d) => d >= needed);

  console.log(sums[0]);
});
