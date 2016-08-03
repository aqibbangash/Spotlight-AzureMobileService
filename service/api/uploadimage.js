exports.post = function(request, response) {
    // Request body values
    var name = request.body.name;
    // 3rd party extension
    var cloudinary = require('cloudinary').cloudinary;
  
    
    //cloudinary.config({cloud_name : 'dfdfn0mbh', api_key : '293737351876776', api_secret : 'hrzA9DtPTnut9kkyRfsaXtPvXdU' });
    
    //Upload
    
    response.send(statusCodes.OK, { message : 'Hello World!' , yep : cloudinary});
};