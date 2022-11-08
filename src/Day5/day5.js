var fs = require('fs');
var prompt = require('prompt-sync')();

function parseInput(input) {
    var pc = 0;

    while (true) {
        var fullOpcode = input[pc];
        var opcode = fullOpcode % 100;
        var mode1 = Math.floor(fullOpcode / 100) % 10;
        var mode2 = Math.floor(fullOpcode / 1000) % 10;
        var mode3 = Math.floor(fullOpcode / 10000) % 10;


        switch (opcode) {
            case 1:
                if (mode1) var in1 = input[pc + 1];
                else var in1 = input[input[pc + 1]];

                if (mode2) var in2 = input[pc + 2];
                else var in2 = input[input[pc + 2]];


                var out = input[pc + 3];
                input[out] = in1 + in2;
                pc += 4;
                break;
            case 2:
                if (mode1) var in1 = input[pc + 1];
                else var in1 = input[input[pc + 1]];

                if (mode2) var in2 = input[pc + 2];
                else var in2 = input[input[pc + 2]];

                var out = input[pc + 3];

                input[out] = in1 * in2;
                pc += 4;
                break;

            case 3:
                var inValue = parseInt(prompt('Set input value: '));
                var addr = input[pc + 1];
                input[addr] = inValue;
                pc += 2;
                break;

            case 4:
                if (mode1) var out = input[pc + 1];
                else var out = input[input[pc + 1]];
                console.log(out);
                pc += 2;
                break;

            case 5:
                if (mode1) var in1 = input[pc + 1];
                else var in1 = input[input[pc + 1]];

                if (mode2) var in2 = input[pc + 2];
                else var in2 = input[input[pc + 2]];

                if (in1 != 0) pc = in2;
                else pc += 3;
                break;

            case 6:
                if (mode1) var in1 = input[pc + 1];
                else var in1 = input[input[pc + 1]];

                if (mode2) var in2 = input[pc + 2];
                else var in2 = input[input[pc + 2]];

                if (in1 == 0) pc = in2;
                else pc += 3;
                break;

            case 7:
                if (mode1) var in1 = input[pc + 1];
                else var in1 = input[input[pc + 1]];

                if (mode2) var in2 = input[pc + 2];
                else var in2 = input[input[pc + 2]];

                var out = input[pc + 3];
                if (in1 < in2) input[out] = 1;
                else input[out] = 0;
                pc += 4;
                break;

            case 8:
                if (mode1) var in1 = input[pc + 1];
                else var in1 = input[input[pc + 1]];

                if (mode2) var in2 = input[pc + 2];
                else var in2 = input[input[pc + 2]];

                var out = input[pc + 3];
                if (in1 == in2) input[out] = 1;
                else input[out] = 0;
                pc += 4;
                break;

            case 99:
                return 0;

            default:
                console.log("Unknown opcode: " + opcode);
                return -1;
        }
    }
}


console.log("Part 1: ");
var input = fs.readFileSync('day5.input', 'utf-8').toString().split(',').map(number => {
    return parseInt(number, 10);
});
var error = parseInput(input);
if (error) console.log("Error: " + error);

console.log("Part 2: ");
var input = fs.readFileSync('day5.input', 'utf-8').toString().split(',').map(number => {
    return parseInt(number, 10);
});
var error = parseInput(input);
if (error) console.log("Error: " + error);