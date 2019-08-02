//console.log("slide01");

async function init() {
  var StartYear=2010;
  var EndYear=2015;
  StartYear = $('#StartYearDropDown').val();
  EndYear = $('#EndYearDropDown').val();
  console.log(StartYear);
  console.log(EndYear);
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
 
    svgp = d3.select("svg");
    d3.selectAll("#chart > *").remove()

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
    // console.log(LatMin);
    // console.log(LatMax);
    // console.log(LonMin);
    // console.log(LonMax);
    

    var mygroup = d3.select("#chart").attr("width", width - 10).attr("height", height)
      .append("g").attr("width", width - 10).attr("height", height)
      .attr("transform", "translate(50,50)").attr("fill", "grey");
    //d3.select("svg").append("g").attr("transform","translate(50,50)");

    // Define the div for the tooltip
    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // var xScale = d3.scaleLinear().domain([LatMin,LatMax]).range([0, 400]);
    // var yScale = d3.scaleLinear().domain([LonMin,LonMax]).range([0,400]);
    var xScale = d3.scaleBand().domain(["January","February","March","April","May","June","July","August","September","October","November","December"]).range([0, width-100]);
    //var yScale = d3.scaleLinear().domain([StartYear, EndYear]).range([0, height-500]);
    var yScale = d3.scaleLinear().domain([StartYear, EndYear]).range([20, height-500]);

    var xAxis = d3.axisBottom().scale(xScale).ticks(12,"s");
    //var yAxis = d3.axisLeft().scale(yScale).ticks(EndYear-StartYear);
    var yAxis = d3.axisLeft().scale(yScale).ticks(EndYear-StartYear+1);
    mygroup.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate(0,500)");
    mygroup.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(0,0)");

    mygroup.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 500)
    .attr("y", 550)
    .text("Month");
    mygroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", 00)
    .text("Year")
    .attr("transform", "translate(20,10) rotate(-90)");


    //Month & Year Vs fatalities
    mygroup.selectAll("circle").data(data).enter().append("circle")
      //.filter(function(d,i){ return data[i].Year>=StartYear && data[i].Year<=EndYear; })
      .attr("cx", function (d, i) {
        return((data[i].Year>=StartYear && data[i].Year<=EndYear)? xScale(data[i].Month):0);
      })
      .attr("cy", function (d, i) {
        //return yScale(data[i].Year); 
         return((data[i].Year>=StartYear&& data[i].Year<=EndYear)? yScale(data[i].Year): 0) ;
      })
      .attr("r", function (d, i) {
        //return 1
        return((data[i].Year>=StartYear && data[i].Year<=EndYear)? 1: 0) ;
      })
      .attr("fill", "green")
      .attr("stroke","black")
      .transition().duration(5000)
      .attr("cx", function (d, i) {
        //return xScale(data[i].Month);
        return((data[i].Year>=StartYear && data[i].Year<=EndYear)? xScale(data[i].Month):0);
      })
      .attr("cy", function (d, i) {
        //return yScale(data[i].Year);
        // console.log(data[i].Year);
        // console.log(data[i].Year>=StartYear&& data[i].Year<=EndYear);
        // console.log(yScale(data[i].Year));
        return((data[i].Year>=StartYear&& data[i].Year<=EndYear)? yScale(data[i].Year): 0) ;
      })
      .attr("r", function (d, i) {
        //return 0 + data[i].Fatalities;
        return((data[i].Year>=StartYear && data[i].Year<=EndYear)? data[i].Fatalities: 0) ;
      })
      .attr("fill", function(d,i) { 
        return (data[i].Fatalities > 40 ? "Red" : data[i].Fatalities > 10? "purple":"blue");
      });

    mygroup.selectAll("circle").data(data)
      .on("mouseover", function (d) {
        div.style("opacity", .9)
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px")
          .html("# of Fatalities are " + d.Fatalities);
      })
      .on("mouseout", function (d) {
        div.style("opacity", 0);
      });


  });

};

$(function () {
  console.log("In function")
  init();
});