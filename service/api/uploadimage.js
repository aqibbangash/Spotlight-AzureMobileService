exports.post = function(request, response) {
    // Request body values
    //var name = request.body.name;
    // 3rd party extension
   var cloudinary = require('cloudinary');
var cloudinary = require('cloudinary'); 
cloudinary.config({cloudinary:'//345146331124229:UPjachvXs18IxVOJfVoAn2sTw_M@hezfpayoy'});

response.send(statusCodes.OK, { message : 'Hello World!',});
    
};