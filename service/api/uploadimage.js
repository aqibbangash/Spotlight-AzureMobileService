exports.post = function(request, response) {
    // Request body values
    var name = request.body.name;
    // 3rd party extension
    var cloudinary = require('cloudinary')();
  
    
    cloudinary.config({cloud_name : 'hdemxqeq3', api_key : '636525738353489', api_secret : 'vBhen3A7vcAQ7QF6PNvUrsS4kCk' });
    
    
    cloudinary.uploader.upload('http://image.shutterstock.com/z/stock-vector-grunge-rubber-stamp-with-word-lame-vector-illustration-151984781.jpg',function(result) { 
        response.send(statusCodes.OK, { message : 'Hello World!',result : result});});
    //Upload
    
    
};