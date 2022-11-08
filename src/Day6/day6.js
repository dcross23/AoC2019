var fs = require('fs');


function getOrbits(input) {
    var graph = []
    input.forEach((orbit) => {
        orbit = orbit.trim();
        var planet1 = orbit.split(')')[0];
        var planet2 = orbit.split(')')[1];

        if (graph[planet1] == undefined) {
            graph[planet1] = [];
        }
        graph[planet1].push(planet2);
    });
    return graph
}

function getOrbitCount(graph, planet, depth) {
    var count = depth;
    if (graph[planet] != undefined) {
        graph[planet].forEach((orbit) => {
            count += getOrbitCount(graph, orbit, depth + 1);
        });
    }
    return count;
}


function getGraph(input) {
    var graph = []
    input.forEach((orbit) => {
        orbit = orbit.trim();
        var planet1 = orbit.split(')')[0];
        var planet2 = orbit.split(')')[1];

        if (graph[planet1] == undefined) {
            graph[planet1] = [];
        }
        if (graph[planet2] == undefined) {
            graph[planet2] = [];
        }
        graph[planet1].push(planet2);
        graph[planet2].push(planet1);
    });
    return graph
}

function getPath(graph, start, end) {
    var queue = [[start]];
    var visited = new Set();
    while (queue.length > 0) {
        var next = queue.shift();
        var node = next[next.length - 1];
        if (node == end) {
            return next;
        }

        if (!visited.has(node)) {
            visited.add(node);
            graph[node].forEach((neighbor) => {
                var newNeighbor = next.slice();
                newNeighbor.push(neighbor);
                queue.push(newNeighbor);
            });
        }
    }
}


console.log("Part 1: ");
var input = fs.readFileSync('day6.input', 'utf-8').toString().split('\n')
var graph = getOrbits(input);
var count = getOrbitCount(graph, 'COM', 0);

console.log(count);

console.log("Part 2: ");
var input = fs.readFileSync('day6.input', 'utf-8').toString().split('\n')
var graph = getGraph(input);

var path = getPath(graph, 'YOU', 'SAN');
path.splice(path.indexOf('YOU'), 1);
path.splice(path.indexOf('SAN'), 1);

var orbitalTransfers = path.length - 1;
console.log(orbitalTransfers)