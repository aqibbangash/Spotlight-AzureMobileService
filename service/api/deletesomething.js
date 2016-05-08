exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
    //   var tables = request.service.tables;
    //   var push = request.service.push;

    var table = request.service.tables.getTable('reports');
    table.where({ id: request.body.id}).read({
        success: function(res){


                table.del(res, function(r) {
                    
                    
                      response.send(statusCodes.OK, { message : 'Hello Deleted: '+res });
                      
                     
                }
                    );
                
            
        }
    });
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};