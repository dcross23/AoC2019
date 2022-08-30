var fs = require('fs');


function parseEntryValuePart1(value) {
    var strValue = value.toString()

    if (strValue.length != 6)
        return false;

    var twoDigitsSame = false;
    var isIncreasing = true;

    for (var i = 0; i < strValue.length - 1; i++) {
        if (strValue[i] == strValue[i + 1])
            twoDigitsSame = true;

        if (strValue[i] > strValue[i + 1])
            isIncreasing = false
    }

    return twoDigitsSame && isIncreasing;
}

function parseEntryValuePart2(value) {
    var strValue = value.toString()

    if (strValue.length != 6)
        return false;

    var twoDigitsSame = false;
    var isIncreasing = true;

    var i = 0;
    while (i < strValue.length - 1) {
        if (strValue[i] > strValue[i + 1])
            isIncreasing = false

        if (!twoDigitsSame && strValue[i] == strValue[i + 1]) {
            var j = i + 2;
            while (j < strValue.length && strValue[j] == strValue[i]) {
                j++;
            }

            if (j == i + 2) {
                twoDigitsSame = true;
            }

            i = j - 1;
        }
        else
            i++;

    }

    return twoDigitsSame && isIncreasing;
}


var input = fs.readFileSync('day4.input', 'utf-8').toString().split("-")

var values = {
    min: parseInt(input[0]),
    max: parseInt(input[1])
}

var validValues = []
var validValues2 = []
for (var i = values.min; i <= values.max; i++) {
    var isValidPart1 = parseEntryValuePart1(i)
    if (isValidPart1)
        validValues.push(i)

    var isValidPart2 = parseEntryValuePart2(i)
    if (isValidPart2)
        validValues2.push(i)

}

console.log("Part 1: ", validValues.length)
console.log("Part 2: ", validValues2.length)