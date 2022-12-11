const fs = require('fs');

fs.readFile('./data.md', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  let monkeys = data.split('\n\n').map((d) => {
    const _d = d.split('\n');
    return {
      id: parseInt(_d[0].split(' ')[1]),
      items: _d[1]
        .split(': ')[1]
        .split(', ')
        .map((i) => parseInt(i)),
      op: _d[2].split('new = old ')[1].replace('* old', '** 2'),
      test: parseInt(_d[3].match(/\d+/g)),
      yes: parseInt(_d[4].match(/\d+/g)),
      no: parseInt(_d[5].match(/\d+/g)),
      inspected: 0,
    };
  });

  // console.log(monkeys);

  for (let round = 0; round < 20; round += 1) {
    for (const monkey of monkeys) {
      // console.log(`\nMonkey ${monkey.id}`);
      const { items, op, test, yes, no } = monkey;

      for (let [i, item] of items.entries()) {
        monkey.inspected += 1;

        let worry = eval(`${item} ${op}`);
        worry = Math.floor(worry / 3);
        item = worry;

        items[i] = null;

        if (worry % test === 0) monkeys[yes].items.push(worry);
        else monkeys[no].items.push(worry);
      }
      monkey.items = monkey.items.filter((d) => d);

      // console.log(monkeys.map((d) => `Monkey ${d.id}: ${d.items}`));
    }
  }

  console.log(monkeys.map((d) => `Monkey ${d.id}: ${d.inspected}`));
  monkeys = monkeys.sort((a, b) => b.inspected - a.inspected);
  console.log(monkeys[0].inspected * monkeys[1].inspected);
});
