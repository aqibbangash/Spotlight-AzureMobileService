exports.post = function(request, response) {
    
    var username = request.body.username;
    var password = request.body.password;
    
    
    var usersTable = request.service.tables.getTable("users");
    
    usersTable.find().then(function(result){
       
       response.send(statusCodes.OK, { message : 'Hello World!' });
       
    })
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};