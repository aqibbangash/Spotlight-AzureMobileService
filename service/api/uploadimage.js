exports.post = function(request, response) {
    // Request body values
    var name = request.body.name;
    // 3rd party extension
    //var cloudinary = require('cloudinary')();
  var SendGrid = require('sendgrid').SendGrid;
    var Cloudinary = require('cloudinary').Cloudinary;
    
    var cloudinary = new Cloudinary();
    
    //cloudinary.config({});
        var sendgrid = new SendGrid('azure_391f99ebb5506b93a27577ef7cd597f5@azure.com', '4mxJQRASw6ysjE1');

     response.send(statusCodes.OK, { message : 'ello World!', name : cloudinary});
            
    //cloudinary.config({cloud_name : 'hdemxqeq3', api_key : '636525738353489', api_secret : 'vBhen3A7vcAQ7QF6PNvUrsS4kCk' });
    
    
    //cloudinary.uploader.upload('http://image.shutterstock.com/z/stock-vector-grunge-rubber-stamp-with-word-lame-vector-illustration-151984781.jpg',function(result) { 
        //response.send(statusCodes.OK, { message : 'Hello World!',result : result});});
    //Upload
    response.send(statusCodes.OK, { message : 'Hello World!', name : SendGrid});
    
};