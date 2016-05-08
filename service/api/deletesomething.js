exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    var table = request.service.tables.getTable('request');
    table.where({ id: request.body.id}).read({
        success: function(res){

                response.send(statusCodes.OK, { message : 'Hello World!: '+res });
            
        }
    });
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};