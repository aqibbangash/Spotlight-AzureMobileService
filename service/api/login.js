exports.post = function(request, response) {
    
    var username = request.body.username;
    var password = request.body.password;
    
    
    
    response.send(statusCodes.OK, { message : 'Hello World!' });
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};