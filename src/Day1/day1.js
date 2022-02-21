var fs = require('fs');

console.log("Part 1: ");
var input = fs.readFileSync('day1.input', 'utf-8').toString().split('\n');
var result = 0;
input.forEach(value => {
    let calc = Math.floor(value/3) - 2;
    result += calc;
});
console.log(result);


function get_fuel(value){
    let calc = Math.floor(value/3) - 2;
    if(calc <= 0)
        return 0;
    else   
        return calc += get_fuel(calc);
}

console.log("\nPart 2: ");
var input = fs.readFileSync('day1.input', 'utf-8').toString().split('\n');
var result = 0;
input.forEach(value => {
    let calc = get_fuel(value);
    result += calc;
});
console.log(result);