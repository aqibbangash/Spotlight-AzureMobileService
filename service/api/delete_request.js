exports.post = function(request, response) {
    // Tables
    var friendsTable    = request.service.tables.getTable('friends');  
    var usersTable      = request.service.tables.getTable('Users');  

    // Delete friends
    friendsTable.where({friend:request.body.user_id}).read({
        success: function(results) {
                    if (results.length > 0) {
                        results.foreach(function(result){
                            friendsTable.del(result,{
                                    success:function(res){
                                                response.send(statusCodes.OK, { message : "Friend deleted."});
                                     } 
                            });         
                        });
                    } 
                    else {
                      response.send(statusCodes.OK, { message : "No user found"});
                    }
                }        
    });
    
    // Delete user
    usersTable.where({id:request.body.user_id}).read({
            success: function(results) {
                        if (results.length > 0) {
                             usersTable.del(results[0],{
                                         success:function(res){
                                                    response.send(statusCodes.OK, { message : "User deleted."});
                                                } 
                            });
                        } 
                        else {
                              response.send(statusCodes.OK, { message : "No user found"});
                        }
                }        
    });
};

