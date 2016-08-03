exports.post = function(request, response) {
    // Request body values
    var name = request.body.name;
    
    response.send(statusCodes.OK, { message : 'Hello World!' });
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};