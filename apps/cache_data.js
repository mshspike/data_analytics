/**** Node.js library ****/
var request  = require("request");
var fs       = require("fs");

api_call("UN/DEV_POPULATIONTOTAL_HKG.json?column=1"); // Total population

/**** API call and assigning to array ****/
function api_call(url) {
  request("https://www.quandl.com/api/v1/datasets/"+url, function(error, response, body) {
    if (!error && response.statusCode == 200) { // Successful
      // Parsing response to JSON format, appending each to arr_data var.
      var info = JSON.parse(body);
      var arr  = [];

      for (var i = 0; i < info.data.length; i++) {
        var y = parseInt(info.data[i][0].substr(0,4));
        var d = info.data[i][1];
        arr.push([y,d]);
      }
      // Write to cache file with arr_data variable.
      createFile(arr);
    } else {  // Fail
      console.log("API call failed.");
    }
  });
}

/**** Write JSON to file ****/
function createFile(arr) {
  var file_path = "../cache/data_by_year.json";
  var file_data = {
    "last_update": (new Date().toDateString()),
    "data": arr
  };
  if (fs.existsSync(file_path)) {
    fs.unlinkSync(file_path);
  }
  fs.writeFile(file_path, JSON.stringify(file_data), "utf8", function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("File write successfully!");
  });
};
