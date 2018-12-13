const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    let nums = data.split('\n')[0].split(' ');

    let tree = {};
    let id = -1;
    let n = 0;

    let metas = 0;

    tree = buildNode();
    findValue(tree);

    function buildNode() {
        id += 1;

        const nodesLength = parseInt(nums[n]);
        const metaLength = parseInt(nums[n + 1]);

        let node = {
            id,
            nodes: new Array(nodesLength).fill(''),
            meta: new Array(metaLength).fill('')
        };

        n += 2;

        while (node.nodes.indexOf('') > -1) {
            node.nodes.shift();
            node.nodes.push(buildNode());
            n += 1;
        }

        while (node.meta.indexOf('') > -1) {
            node.meta.shift();
            node.meta.push(parseInt(nums[n]));
            metas += parseInt(nums[n]);
            n += 1;
        }

        n -= 1;

        return node;
    }

    function findValue(node) {
        if (node.nodes.length > 0) {
            for (let n of node.nodes) {
                findValue(n);
            }

            let value = 0;

            for (let meta of node.meta) {
                const n = node.nodes[meta - 1];
                if (n) value += n.value;
            }
            node.value = value;
        } else {
            node.value = node.meta.reduce((a, b) => a + b, 0);
        }
    }

    console.log(tree);
});
