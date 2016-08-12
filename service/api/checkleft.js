exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    var userId = request.body.id;
     response.send(statusCodes.OK, { message : userId });
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : request.params.id });
};