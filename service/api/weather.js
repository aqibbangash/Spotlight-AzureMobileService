exports.get = function(request, response) {

var YQL = require('yql');
      var query = "SELECT * from weather.forecast WHERE (location = @zip)";
      new YQL.exec(query, function(data) {
        console.log("yess","yess");
response.send(200, data.query.results.channel);
      }, {"zip": 90210});
};
