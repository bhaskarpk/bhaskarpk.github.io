console.log("slide03");

async function init() {
  var width = 1000;
  var height = 1000;
  var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
  };

  

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

    var sumtotals = d3.nest()
                     .key(function(d) { return d.Year;})
                     .rollup(function(d) { 
                         return d3.sum(d, function(g) {return g.Fatalities;});
                      }).entries(data);

    var STMin = d3.min(sumtotals, function (d) {
      return d.value;
    });
    var STMax = d3.max(sumtotals, function (d) {
      return d.value;
    });

    var mygroup = d3.select("#chart").attr("width", width - 10).attr("height", height)
      .append("g").attr("width", width - 10).attr("height", height)
      .attr("transform", "translate(50,50)").attr("fill", "grey");

    var xScale = d3.scaleLinear().domain([1995,2017]).rangeRound([100, width-300]);
    var yScale = d3.scaleLinear().domain([STMax,STMin]).range([100,height-500]);

    console.log(sumtotals[1].key);
    console.log(sumtotals[1].value);
    console.log(STMin);
    console.log(STMax);

    var tooltipbox = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    var xAxis = d3.axisBottom().scale(xScale).ticks(24,"d");//tickFormat(d3.format("~s"));
    var yAxis = d3.axisLeft().scale(yScale).ticks(10);
    mygroup.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate(0,500)").append("text");
    mygroup.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(100,0)").append("text");
    
    mygroup.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 500)
    .attr("y", 550)
    .text("Year");
    mygroup.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 100)
    .attr("y", 80)
    .text("Total Fatalities")
    .attr("transform", "translate(10, rotate(-90)");
     
    mygroup.append("g").selectAll("rect").data(sumtotals).enter()
      .append("rect")
      .attr("class", "bar")
      .attr("width", 20)
      //.transition().duration(5000)
      //.attr("height", function (d) { return height- d.value; })
      .attr("height", function (d) { return 500-yScale(d.value); })
      .attr("x", function(d) {return xScale(d.key);})
      .attr("y", function (d) { return yScale(d.value); })
      .attr("fill", "red")
      .attr("transform","translate(0,00)")
      .on("mouseover", function(d) { 
        tooltipbox.style("opacity",.9)  
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px")
        .html("TotalFatalities are "+d.value);
        })          
       .on("mouseout", function(d) {  
       tooltipbox.style("opacity",0); 
       });



      console.log("Here 3");
  });
};

//   var focus = svg.append("g")
//       .attr("class", "focus")
//       .style("display", "none");
  
//   focus.append("text")
//       .attr("class", "abbr")
//       .attr("x", -10)
//       .attr("y", -30)
//       .attr("dy", ".35em");

//   focus.append("text")
//       .attr("class", "latlng")
//       .attr("x", -10)
//       .attr("y", -13)
//       .attr("dy", ".35em");
// });

//     var mygroup = d3.select("#chart").attr("width", width - 10).attr("height", height)
//       .append("g").attr("width", width - 10).attr("height", height)
//       .attr("transform", "translate(50,50)").attr("fill", "grey");
//     //d3.select("svg").append("g").attr("transform","translate(50,50)");

//     // Define the div for the tooltip
//     var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

//     // var xScale = d3.scaleLinear().domain([LatMin,LatMax]).range([0, 400]);
//     // var yScale = d3.scaleLinear().domain([LonMin,LonMax]).range([0,400]);
//     var xScale = d3.scaleLinear().domain([1, 12]).range([0, 500]);
//     var yScale = d3.scaleLinear().domain([2008, 2017]).range([0, 500]);

//     var xAxis = d3.axisBottom().scale(xScale).ticks(12).tickFormat(d3.format("~s"));
//     var yAxis = d3.axisLeft().scale(yScale).ticks(10).tickFormat(d3.format("~s"));
//     mygroup.append("g").attr("class", "x axis").call(xAxis).attr("transform", "translate(0,500)");
//     mygroup.append("g").attr("class", "y axis").call(yAxis).attr("transform", "translate(0,0)");

//     // mygroup.selectAll("circle").data(data).enter().append("circle")
//     //   .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
//     //   .attr("cy", function(d,i) { return yScale(data[i].Longitude); })
//     //   .attr("r", function(d,i) { return 0+data[i].Fatalities; })
//     //   .attr("fill", "red")
//     //   .on("mouseover", function(d) { 
//     //     div.style("opacity",.9)  
//     //     .style("left", (d3.event.pageX) + "px")
//     //     .style("top", (d3.event.pageY) + "px")
//     //     .html("# of Fatalities are "+d.Fatalities);
//     //     })          
//     //    .on("mouseout", function(d) {  
//     //    div.style("opacity",0); 
//     //    });


//     // mygroup.selectAll("circle").data(data).enter().append("circle")
//     //   .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
//     //   .attr("cy", function(d,i) { return 0; })
//     //   .attr("r", function(d,i) { return 1 })
//     //   .attr("fill", "purple")
//     //   .transition().duration(5000)
//     //   .attr("cx", function(d,i) { return xScale(data[i].Latitude); })
//     //   .attr("cy", function(d,i) { return yScale(data[i].Longitude); })
//     //   .attr("r", function(d,i) { return  0+data[i].Fatalities;})
//     //   .attr("fill", "red"); 

//     //Month & Year Vs fatalities
//     mygroup.selectAll("circle").data(data).enter().append("circle")
//       .attr("cx", function (d, i) {
//         return xScale(data[i].Month);
//       })
//       .attr("cy", function (d, i) {
//         return yScale(data[i].Year);
//       })
//       .attr("r", function (d, i) {
//         return 1
//       })
//       .attr("fill", "purple")
//       .transition().duration(5000)
//       .attr("cx", function (d, i) {
//         return xScale(data[i].Month);
//       })
//       .attr("cy", function (d, i) {
//         return yScale(data[i].Year);
//       })
//       .attr("r", function (d, i) {
//         return 0 + data[i].Fatalities;
//       })
//       .attr("fill", "red");

//     mygroup.selectAll("circle").data(data)
//       .on("mouseover", function (d) {
//         div.style("opacity", .9)
//           .style("left", (d3.event.pageX) + "px")
//           .style("top", (d3.event.pageY) + "px")
//           .html("# of Fatalities are " + d.Fatalities);
//       })
//       .on("mouseout", function (d) {
//         div.style("opacity", 0);
//       });
//  });

$(function () {
  init();
});