const fs = require('fs');


function getLayers(image, wide, tall) {
    const layers = [];
    let layer = [];
    let row = "";
    for (let i = 0; i < image.length; i++) {
        row += image[i];
        if (row.length === wide) {
            layer.push(row);
            row = [];
        }
        if (layer.length === tall) {
            layers.push(layer);
            layer = [];
        }
    }
    return layers;
}

function getMinZerosLayer(layers) {
    var numZeros = layers.map(layer => {
        var layerString = layer.join('')
        return layerString.split('0').length - 1;
    })

    var indexOfMinNumZeros = numZeros.indexOf(Math.min(...numZeros));
    var layerWithMinZeros = layers[indexOfMinNumZeros];

    return layerWithMinZeros.join('');
}

function part1(input, wide, tall) {
    var layers = getLayers(input, wide, tall)
    var layerWithMinZeros = getMinZerosLayer(layers);

    var numOnes = layerWithMinZeros.split('1').length - 1;
    var numTwos = layerWithMinZeros.split('2').length - 1;

    return numOnes * numTwos;
}


function part2(input, wide, tall) {
    var layers = getLayers(input, wide, tall);

    var message = ""

    for (var i = 0; i < layers[0].length; i++) {
        for (var j = 0; j < layers[0][0].length; j++) {

            for (var k = 0; k < layers.length; k++) {
                if (layers[k][i][j] !== '2') {
                    message += (layers[k][i][j] === '1' ? 'X' : ' ');
                    break;
                }
            }
        }
        message += '\n';
    }

    return message;
}





console.log("Part 1: ");
var input = fs.readFileSync('day8.input', 'utf-8').toString()
console.log(part1(input, 25, 6));


console.log("Part 2: ");
console.log(part2(input, 25, 6))
