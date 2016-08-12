exports.post = function(request, response) {
   
    var userId = request.body.id;
     response.send(statusCodes.OK, { message : userId });
   
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : request.params.id });
};