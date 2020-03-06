// JavaScript source code

/*d3.queue()
    .defer(d3.json, "world.topojson")
    .await(ready)
    */


var width = 960,
    height = 500;

var wheelAction= 0, strokeWidth = 5;

var projection = d3.geoMercator()
    .center([0, 5])
    .scale(150)
    .rotate([-180, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath()
    .projection(projection);

var g = svg.append("g")
    .attr("class", "country");
//.style("fill", "2f3035");
/*.on("mouseover", function(){
    d3.select(this).attr("class", countryOn);
});*/

// load and display the World
d3.json("world-50m.v1.json").then(function (topology) { //world-110m2.json

    g.selectAll("path")
        .data(topojson.feature(topology, topology.objects.countries)
            .features)
        .enter().append("path")
        .attr("d", path);

});

var zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on('zoom', function () {
        g.selectAll('path')
            .attr('transform', d3.event.transform)
            .on('wheel', function (event) {
                if (event.deltaY < 0) {
                    console.log('scrolling up');
                    wheelAction = 1;
                }
                else if (event.deltaY > 0) {
                    console.log('scrolling down');
                    wheelAction = 2;
                }
            })
            .style("stroke-width", function () {
                console.log("Test1");
                if(wheelAction == 1){
                    return strokeWidth+1;
                }else if(wheelAction == 2){
                    return strokeWidth-1;
                }
            });
        console.log("Test2");
    });

svg.call(zoom);
