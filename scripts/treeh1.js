let x = new Array(4096);
let y = new Array(4096);
let order = 14;
let sqrt2 = Math.sqrt(1 / 2);

for (let init = 0; init < 4096; init++) {
    x[init] = 0;
    y[init] = 0;
}

for (let i = 0; i < order; i++) {
    let s = i % 2;
    for (let j = Math.pow(2, i); j < Math.pow(2, (i + 1)) - 1; j++) {
        if (s === 1) {
            x[2 * j] = x[j];
            y[2 * j] = y[j] + Math.pow(sqrt2, i);
            x[2 * j + 1] = x[j];
            y[2 * j + 1] = y[j] - Math.pow(sqrt2, i);
        } else {
            x[2 * j] = x[j] + Math.pow(sqrt2, i);
            y[2 * j] = y[j];
            x[2 * j + 1] = x[j] - Math.pow(sqrt2, i);
            y[2 * j + 1] = y[j];
        }
    }
}
let width = 640;
let height = 640;;

// create the svg container
var svg = d3.select("#canvas").append("svg")
    .attr("width", width )
    .attr("height", height )
    .append("g");

// set up the x scale
var xScale = d3.scaleLinear()
    .domain([-1.8, 1.8])
    .range([0, width]); // actual length of axis

// set up the y scale
var yScale = d3.scaleLinear()
    .domain([-1.8, 1.8])
    .range([height, 0]); // actual length of axis

for (let j = 1; j < Math.pow(2, order) - 1; j++) {
    //console.log("(x,y)-(x,y):", x[2 * j], y[2 * j], x[2 * j + 1], y[2 * j + 1]);
    var htree = svg.append("line")
        .attr("x1", xScale(x[2 * j]))
        .attr("y1", yScale(y[2 * j]))
        .attr("x2", xScale(x[2 * j + 1]))
        .attr("y2", yScale(y[2 * j + 1]))
        .attr("stroke-width", .1)
        .attr("stroke", "dodgerblue");
}