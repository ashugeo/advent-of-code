const data = require('./data.json');

for (let noun = 0; noun <= 99; noun += 1) {
    loop1:
    for (let verb = 0; verb <= 99; verb += 1) {
        opcodes = [...data];
        opcodes[1] = noun;
        opcodes[2] = verb;
        // console.log(noun, verb);

        for (let i = 0; i < opcodes.length; i += 4) {
            const opcode = opcodes[i];

            if (opcode === 1) {
                opcodes[opcodes[i + 3]] = opcodes[opcodes[i + 1]] + opcodes[opcodes[i + 2]];
            } else if (opcode === 2) {
                opcodes[opcodes[i + 3]] = opcodes[opcodes[i + 1]] * opcodes[opcodes[i + 2]];
            } else if (opcode === 99) {
                if (opcodes[0] === 19690720) {
                    console.log(opcodes[0], noun, verb);
                    return;
                }
                // console.log(opcodes[0]);
                continue loop1;
            } else {
                console.log('error');
            }
        }

        console.log(opcodes[0]);
    }
}

// console.log(data);
