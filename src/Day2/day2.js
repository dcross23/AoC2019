var fs = require('fs');

function parseInput(input, noun, verb){
    var pc = 0;
    input[1] = noun;
    input[2] = verb;
    while(true){
        var opcode = input[pc];

        if(opcode == 99)
            break;
        else{
            var in1 = input[pc+1];
            var in2 = input[pc+2];
            var out = input[pc+3];

            if(opcode == 1)
                input[out] = input[in1] + input[in2];

            else if(opcode == 2)
                input[out] = input[in1] * input[in2];
            
            pc += 4;
        }
    }
    return input[0];
}

console.log("Part 1: ");
var input = fs.readFileSync('day2.input', 'utf-8').toString().split(',').map(number => {
    return parseInt(number, 10);
});
console.log(parseInput(input,12,2));


console.log("\nPart 2: ");
var input = fs.readFileSync('day2.input', 'utf-8').toString().split(',').map(number => {
    return parseInt(number, 10);
});

for(var n=0; n<100; n++){
    for(var v=0; v<100; v++){
        var input_copy = Array.from(input);
        var res = parseInput(input_copy, n, v);
        if( res == 19690720){
            console.log(100*n + v);
            break;
        }
    }
}