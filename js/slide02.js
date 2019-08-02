console.log("slide02");

async function init() {
  var width = 1000;
  var height = 1000;
  var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
  };
  //width = width - margin.left - margin.right,
  //height = height - margin.top - margin.bottom;

  console.log("Enter");
  const data = await d3.csv("/data/dataset.csv");
  d3.csv("/data/dataset.csv", function (data) {
    return {
      Title: data.Title,
      Year: +data.Year,
      Month: data.Month,
      Fatalities: +data.Fatalities,
      Injured: +data.Injured,
      Totalvictims: +data.Totalvictims,
      Latitude: +data.Latitude,
      Longitude: +data.Longitude,
      Summary: data.Summary,
      MentalHealthIssues: data.MentalHealthIssues,
      Race: data.Race,
      Gender: data.Gender,
      Location: data.Location
    };
  }).then(function (data) {
    //console.log(data);
    console.log("In function");
    svgp = d3.select("svg");
    fp = svgp.select("#first");
    var LatMax = d3.max(data, function (d) {
      return d.Latitude;
    });
    var LatMin = d3.min(data, function (d) {
      return d.Latitude;
    });
    var LonMax = d3.max(data, function (d) {
      return d.Longitude;
    });
    var LonMin = d3.min(data, function (d) {
      return d.Longitude;
    });
    console.log(LatMin);
    console.log(LatMax);
    console.log(LonMin);
    console.log(LonMax);

    var mygroup = d3.select("#chart").attr("width", width - 10).attr("height", height)
      .append("g").attr("width", width - 10).attr("height", height)
      .attr("transform", "translate(50,50)").attr("fill", "grey");
    //d3.select("svg").append("g").attr("transform","translate(50,50)");

    // Define the div for the tooltip
    var tooltipbox = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    var yScale = d3.scaleLinear().domain([LatMax,LatMin]).range([0, width-500]);
    var xScale = d3.scaleLinear().domain([LonMin,LonMax]).range([0,height-400]);
    //var xScale = d3.scaleLinear().domain([1, 12]).range([0, width-100]);
    //var yScale = d3.scaleLinear().domain([2008, 2017]).range([0, height-500]);

    var xAxis = d3.axisBottom().scale(xScale).ticks(5);//.tickFormat(d3.format("~s"));
    var yAxis = d3.axisLeft().scale(yScale).ticks(5);
    mygroup.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(0,0)")
       .append("text").text("Latitude").attr("text-anchor", "end");
    mygroup.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate(0,500)")
       .append("text").text("Longitude").attr("text-anchor", "end");

    mygroup.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 400)
    .attr("y", 550)
    .text("<-- WEST                   Longitude                     EAST-->");
    mygroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 50)
    .attr("y", 50)
    .text("  Latitude  ")
    .attr("transform", "translate(10,20) rotate(-90)");

    //Latitude , Longitude Vs fatalities
    mygroup.selectAll("circle").data(data).enter().append("circle")
      // .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
      // .attr("cy", function(d,i) { return yScale(data[i].Longitude); })
      // .attr("r", function(d,i) { return 0+data[i].Fatalities; })
      //.attr("fill", "red")
      .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
      .attr("cy", function(d,i) { return 0; })
      .attr("r", function(d,i) { return 0})
      .attr("fill", "purple")
      .on("mouseover", function(d) { 
      tooltipbox.style("opacity",.9)  
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html("# of Fatalities are "+d.Fatalities);
        })          
       .on("mouseout", function(d) {  
       tooltipbox.style("opacity",0); 
       })
      .transition().duration(5000)
      .attr("cx", function(d,i) { return xScale(data[i].Longitude); })
      .attr("cy", function(d,i) { return yScale(data[i].Latitude); })
      .attr("r", function(d,i) { return  0+data[i].Fatalities;})
      .attr("fill", "red"); 
       ;

// Features of the annotation
const annotations = [
  {
    note: {
      label: "Here is a trial to see how to see distribution of data without a Map but similar distribution",
      title: "Annotation Usage:"
    },
    x: 500,
    y: 50,
    dy: 0,
    dx: 0
  }
]

// Add annotation to the chart
const makeAnnotations = d3.annotation()
  .annotations(annotations)
d3.select("#chart")
  .append("g")
  .call(makeAnnotations)

  });

};

$(function () {
  init();
});