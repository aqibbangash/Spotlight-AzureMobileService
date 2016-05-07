exports.post = function(request, response) {
    
    var userId = request.body.username;
    var password = request.body.password;
    
    
    var usersTable = request.service.tables.getTable('users');
    
    usersTable.where( {id:userId}).read(
        
        {
            success: function(res)
            {
                response.send(statusCodes.OK, { message: res});
            }
        }
        
    );
    
//    response.send(statusCodes.OK, { message: usersTable.});
    
//    usersTable.lookup( userId, {  
//        
//        success: function (userId)
//        {
//            response.send(statusCodes.OK, { message: 'User has been found.'});
//        }
//        
//    });
//    usersTable.lookup(username, {
//            success: function(userRecord) {
//                
//              response.send(statusCodes.OK, { message: 'User has been found.'})
//                
//            }
//            
//        });
//  
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};