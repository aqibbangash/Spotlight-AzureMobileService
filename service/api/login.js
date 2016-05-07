exports.post = function(request, response) {
    
    
    response.send(statusCodes.OK, { message : 'Hello World!'+request.body.username });
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};