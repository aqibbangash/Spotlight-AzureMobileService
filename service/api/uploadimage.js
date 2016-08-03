exports.post = function(request, response) {
    // Request body values
    var name = request.body.name;
    // 3rd party extension
    //var cloudinary = require('cloudinary')();
  var Cloudinary = require('cloudinary')();

response.send(statusCodes.OK, { message : 'Hello World!'});
    
};