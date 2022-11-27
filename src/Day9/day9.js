var fs = require('fs');
var Computer = require('./computer.js');



console.log("Part 1: ");
var input = fs.readFileSync('day9.input', 'utf-8').toString().split(',').map(number => {
    return parseInt(number, 10);
});

var computer = new Computer(input);
computer.amplifierIn.push(1);
computer.run();
console.log(computer.amplifierOut);


console.log("Part 2: ");
var computer = new Computer(input);
computer.amplifierIn.push(2);
computer.run();
console.log(computer.amplifierOut);
