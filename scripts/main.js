requirejs.config({
  baseUrl: "scripts",
  shim: {
    chart: ["moment-fix"]
  },
  paths: {
    jquery: [
      "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min",
      "lib/jquery-3.1.1.min"],
      moment: "lib/moment.min",
      chart: "lib/Chart.min"
  }
});


require(["jquery"], function($) {
  $.getJSON("cache/data_by_year.json", function(json) {
    var year = [];
    var data = [];

    for (var i = 0; i < json.data.length; i++) {
      year.push(json.data[i][0]);
      data.push(json.data[i][1]);
    }

    year.reverse();
    data.reverse();
    drawScatterPlotGraph(year, data);
  });
});


function drawScatterPlotGraph(d, p) {
  console.log(d);
  console.log(p);
  var ctx = $("#myChart");
  require(["chart"], function(chart) {
      var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: d,
        datasets: [{
          label: "Populations",
          data: p,
          pointRadius: 1,
          pointHitRadius: 7,
          borderColor: "rgba(255,0,0,1)",
          backgroundColor: "rgba(255,0,0,1)"
        }],
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          /*
          xAxes: [{
            type: "time",
            time: {
              unit: "year",
              unitStepSize: 5
            }
          }]
          */
        },
        showLines: false
      }
    });
  });
}

/*
require(["jquery"], function ($) {
  var base_url = "https://www.quandl.com/api/v1/datasets/"
  $.ajax({
    type: "GET",
    url: base_url + "UN/DEV_POPULATIONTOTAL_HKG.json?column=1",
    success: function(result) {
      var date = [];
      var popByYear = [];
      for (var i = 0; i < result.data.length; i++) {
        date.push(result.data[i][0]);
        popByYear.push(result.data[i][1]);
      }
      date.reverse();
      popByYear.reverse();
      drawScatterPlotGraph(date, popByYear);
      console.log(date);
      console.log(popByYear);
    }
  });
});
*/
