exports.post = function(request, response) {
    // Request body values
    //var name = request.body.name;
    // 3rd party extension
   var cloudinary = require('cloudinary://345146331124229:UPjachvXs18IxVOJfVoAn2sTw_M@hezfpayoy');
//cloudinary.uploader.upload("my_picture.jpg")

response.send(statusCodes.OK, { message : 'Hello World!',});
    
};