exports.post = function(request, response) {
    
    var username = request.body.username;
    var password = request.body.password;
    
    
    var usersTable = request.service.tables.getTable('users');
    
    usersTable.lookup(username, {
            success: function(userRecord) {
                
              response.send(statusCodes.OK, { message: 'User has been found.'})
                
            }
            
        });
  
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};