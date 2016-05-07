exports.post = function(request, response) {
    
    var userId = request.body.email;
    var password = request.body.password;
    
    
    var usersTable = request.service.tables.getTable('users');
    
    usersTable.where( {id:userId, password:password}).read(
        
        {
            success: function(res)
            {
                
                if (res.length > 0)
                {
                    response.send(statusCodes.OK, { messages: "Success", user: res});
                }
                else
                {
                    response.send(statusCodes.OK, { messages: "Fail", user: []});
                }
                
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