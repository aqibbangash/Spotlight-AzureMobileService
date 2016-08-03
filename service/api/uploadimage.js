exports.post = function(request, response) {
    // Request body values
    var name = request.body.name;
    // 3rd party extension
   var cloudinary = require('CLOUDINARY_URL').Cloudinary;
cloudinary.uploader.upload("my_picture.jpg")

response.send(statusCodes.OK, { message : 'Hello World!',});
    
};