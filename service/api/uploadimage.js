exports.post = function(request, response) {
    // Request body values
    //var name = request.body.name;
    // 3rd party extension
var cloudinary = require('Cloudinary'); 


response.send(statusCodes.OK, { message : 'Hello World!',});
    
};