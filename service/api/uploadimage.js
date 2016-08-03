exports.post = function(request, response) {
    // Request body values
    //var name = request.body.name;
    // 3rd party extension
   var cloudinary = require('cloudinary');
var cloudinary = require('cloudinary'); 
cloudinary.config({ 
  cloud_name: 'hezfpayoy', 
  api_key: '345146331124229', 
  api_secret: 'UPjachvXs18IxVOJfVoAn2sTw_M' 
});

response.send(statusCodes.OK, { message : 'Hello World!',});
    
};