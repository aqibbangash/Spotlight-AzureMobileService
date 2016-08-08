exports.post = function(request, response) {
    // Request body values
    var userId  = request.body.user_id;
    // Tables
    var friendsTable    = request.service.tables.getTable('friends');  
    var usersTable      = request.service.tables.getTable('Users');  

    // Get all records with friend equals to userId
    friendsTable.where({friend : userId}).read({
        // Delete friends
        success: function(results) {
            if (results.length > 0) {
                results.foreach(function(result){
                    friendsTable.del(result,{
                        success:function(res){
                            response.send(statusCodes.OK, {message : "Friend deleted."});
                         } 
                    });         
                });
            } 
            else {
                response.send(statusCodes.OK, { message : "No user found"});
            }
        }        
    });
    
    // Get record with id equals userId
    usersTable.where({id : userId }).read({
        // Delete user
        success: function(results) {
            if (results.length > 0) {
                usersTable.del(results[0],{
                    success:function(res){
                        response.send(statusCodes.OK, {  completed : true,message : "User deleted."});
                    } 
                });
            } 
            else {
                response.send(statusCodes.OK, { message : "No user found"});
            }
        }        
    });
};

