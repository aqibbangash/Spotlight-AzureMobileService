exports.post = function(request, response) {
    // Request body values
    //var name = request.body.name;
    // 3rd party extension
var Cloudinary = require('cloudinary');


response.send(statusCodes.OK, { message : Cloudinary});
    
};