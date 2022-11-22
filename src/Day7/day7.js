var fs = require('fs');
var Amplifier = require('./amplifier.js');

//Getted from https://gist.github.com/justinfay/f30d53f8b85a274aee57
function getPermutations(array, r) {
    var n = array.length;
    if (r === undefined) {
        r = n;
    }
    if (r > n) {
        return;
    }
    var indices = [];
    for (var i = 0; i < n; i++) {
        indices.push(i);
    }
    var cycles = [];
    for (var i = n; i > n - r; i--) {
        cycles.push(i);
    }
    var results = [];
    var res = [];
    for (var k = 0; k < r; k++) {
        res.push(array[indices[k]]);
    }
    results.push(res);

    var broken = false;
    while (n > 0) {
        for (var i = r - 1; i >= 0; i--) {
            cycles[i]--;
            if (cycles[i] === 0) {
                indices = indices.slice(0, i).concat(
                    indices.slice(i + 1).concat(
                        indices.slice(i, i + 1)));
                cycles[i] = n - i;
                broken = false;
            } else {
                var j = cycles[i];
                var x = indices[i];
                indices[i] = indices[n - j];
                indices[n - j] = x;
                var res = [];
                for (var k = 0; k < r; k++) {
                    res.push(array[indices[k]]);
                }
                results.push(res);
                broken = true;
                break;
            }
        }
        if (broken === false) {
            break;
        }
    }
    return results;
}


function part1(input) {
    const permutations = getPermutations([0, 1, 2, 3, 4]);

    const signals = permutations.map((permutation) => {
        var nextInputValue = 0;
        permutation.forEach((phase) => {
            var amplifier = new Amplifier(input);
            amplifier.amplifierIn.push(phase);
            amplifier.amplifierIn.push(nextInputValue);
            amplifier.run();
            nextInputValue = amplifier.amplifierOut.pop();
        });
        return nextInputValue;
    });


    return Math.max(...signals);
}



function part2(input) {
    const permutations = getPermutations([5, 6, 7, 8, 9]);
    const numAmplifiers = 5;

    const signals = permutations.map((permutation) => {
        var amplifiers = [];
        permutation.forEach((phase) => {
            var amplifier = new Amplifier(input);
            amplifier.amplifierIn.push(phase);
            amplifiers.push(amplifier);
        });

        var actualAmplifier = 0;
        var nextAmplifier = 1;
        var lastOutput = 0;

        amplifiers[actualAmplifier].amplifierIn.push(0);
        while (true) {
            while (amplifiers[actualAmplifier].amplifierOut.length == 0) {
                amplifiers[actualAmplifier].programStep();
                if (amplifiers[actualAmplifier].halted) {
                    return lastOutput;
                }
            }

            lastOutput = amplifiers[actualAmplifier].amplifierOut.pop();
            amplifiers[nextAmplifier].amplifierIn.push(lastOutput);
            actualAmplifier = nextAmplifier
            nextAmplifier = (nextAmplifier + 1) % numAmplifiers;
        }
    });


    return Math.max(...signals);
}


console.log("Part 1: ");
var input = fs.readFileSync('day7.input', 'utf-8').toString().split(',').map(number => {
    return parseInt(number, 10);
});

console.log(part1(input));

console.log("Part 2: ");
console.log(part2(input));
