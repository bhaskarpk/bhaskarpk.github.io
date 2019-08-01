console.log("slide01");

async function init() {
  var year = $('#YearDropDown').val();
  var width = 1000;
  var height = 650;
  var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
  };
  //width = width - margin.left - margin.right,
  //height = height - margin.top - margin.bottom;

  console.log("year: " + year);
  const data = await d3.csv("/data/dataset.csv");
  d3.csv("/data/dataset.csv", function (data) {
    return {
      Title: data.Title,
      Year: +data.Year,
      Month: +data.Month,
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
    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    // var xScale = d3.scaleLinear().domain([LatMin,LatMax]).range([0, 400]);
    // var yScale = d3.scaleLinear().domain([LonMin,LonMax]).range([0,400]);
    var xScale = d3.scaleLinear().domain([1, 12]).range([0, 500]);
    var yScale = d3.scaleLinear().domain([2008, 2017]).range([0, 500]);

    var xAxis = d3.axisBottom().scale(xScale).ticks(12).tickFormat(d3.format("~s"));
    var yAxis = d3.axisLeft().scale(yScale).ticks(10).tickFormat(d3.format("~s"));
    mygroup.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate(0,500)");
    mygroup.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(0,0)");

    // mygroup.selectAll("circle").data(data).enter().append("circle")
    //   .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
    //   .attr("cy", function(d,i) { return yScale(data[i].Longitude); })
    //   .attr("r", function(d,i) { return 0+data[i].Fatalities; })
    //   .attr("fill", "red")
    //   .on("mouseover", function(d) { 
    //     div.style("opacity",.9)  
    //     .style("left", (d3.event.pageX) + "px")
    //     .style("top", (d3.event.pageY) + "px")
    //     .html("# of Fatalities are "+d.Fatalities);
    //     })          
    //    .on("mouseout", function(d) {  
    //    div.style("opacity",0); 
    //    });


    // mygroup.selectAll("circle").data(data).enter().append("circle")
    //   .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
    //   .attr("cy", function(d,i) { return 0; })
    //   .attr("r", function(d,i) { return 1 })
    //   .attr("fill", "purple")
    //   .transition().duration(5000)
    //   .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
    //   .attr("cy", function(d,i) { return yScale(data[i].Longitude); })
    //   .attr("r", function(d,i) { return  0+data[i].Fatalities;})
    //   .attr("fill", "red"); 

    //Month & Year Vs fatalities
    mygroup.selectAll("circle").data(data).enter().append("circle")
      .attr("cx", function (d, i) {
        return xScale(data[i].Month);
      })
      .attr("cy", function (d, i) {
        return yScale(data[i].Year);
      })
      .attr("r", function (d, i) {
        return 1
      })
      .attr("fill", "purple")
      .transition().duration(5000)
      .attr("cx", function (d, i) {
        return xScale(data[i].Month);
      })
      .attr("cy", function (d, i) {
        return yScale(data[i].Year);
      })
      .attr("r", function (d, i) {
        return 0 + data[i].Fatalities;
      })
      .attr("fill", "red");

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
  init();
});