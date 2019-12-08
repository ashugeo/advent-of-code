const range = [137683, 596253];

const passes = [];

for (let i = 0; i < range[1] - range[0]; i += 1) {
    let rule1 = true;
    let rule2 = false;
    const pass = range[0] + i;

    const digits = pass.toString().split('').map(d => parseInt(d));
    for (let n in digits) {
        n = parseInt(n);
        if (digits[n + 1] !== undefined && digits[n + 1] < digits[n]) rule1 = false;
        if (digits[n + 1] !== undefined && digits[n + 1] === digits[n]) rule2 = true;
        if (digits[n + 2] !== undefined && digits[n + 1] !== undefined && digits[n + 1] === digits[n] && digits[n + 2] === digits[n]) rule2 = false;
    }

    if (rule1 && rule2) {
        console.log(pass);
        passes.push(pass);
    }
}

console.log(passes.length);
