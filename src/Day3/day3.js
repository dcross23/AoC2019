var fs = require('fs');

function getPoints(wire) {
    let moves = wire.toString().split(',');
    let points = [];
    let actual = {
        "x": 0,
        "y": 0
    };

    let steps = 0

    points.push({ pnt: actual, steps: steps });

    moves.forEach(move => {
        var ammount = parseInt(move.toString().substr(1), 10);
        if (move[0] == 'R') {
            for (i = actual['x'] + 1; i <= actual['x'] + ammount; i++) {
                var newP = {
                    "x": i,
                    "y": actual['y']
                };

                steps++
                points.push({ pnt: newP, steps: steps });
            }
            actual['x'] += ammount;

        } else if (move[0] == 'L') {
            for (i = actual['x'] - 1; i >= actual['x'] - ammount; i--) {
                var newP = {
                    "x": i,
                    "y": actual['y']
                };

                steps++
                points.push({ pnt: newP, steps: steps });
            }
            actual['x'] -= ammount;

        } else if (move[0] == 'U') {
            for (i = actual['y'] - 1; i >= actual['y'] - ammount; i--) {
                var newP = {
                    "x": actual['x'],
                    "y": i
                };

                steps++
                points.push({ pnt: newP, steps: steps });
            }
            actual['y'] -= ammount;

        } else if (move[0] == 'D') {
            for (i = actual['y'] + 1; i <= actual['y'] + ammount; i++) {
                var newP = {
                    "x": actual['x'],
                    "y": i
                };

                steps++
                points.push({ pnt: newP, steps: steps });
            }
            actual['y'] += ammount;
        }
    });

    return points.filter((points, index, self) =>
        index === self.findIndex((p) => (p.pnt.x === points.pnt.x && p.pnt.y === points.pnt.y))
    );
}



var input = fs.readFileSync('day3.input', 'utf-8').toString().split('\n');

var p1 = getPoints(input[0]);
var p2 = getPoints(input[1]);
var intersections = [];

var p1xCount = 0;
var p1yCount = 0;
p1.forEach(point1 => {
    p2.forEach(point2 => {
        if (point1.pnt.x === point2.pnt.x && point1.pnt.y === point2.pnt.y) {
            if (point1.pnt.x !== 0 && point1.pnt.y !== 0) {
                intersections.push({
                    ...point1.pnt,
                    dst1: point1.steps,
                    dst2: point2.steps,
                })
            }
        }
    });
});

var manhattanDistances = intersections.map(inters => {
    return Math.abs(inters.x) + Math.abs(inters.y);
});

var fullDistances = intersections.map(inters => {
    return inters.dst1 + inters.dst2;
})

console.log("Part 1: ", Math.min.apply(null, manhattanDistances))
console.log("Part 2: ", Math.min.apply(null, fullDistances));
