exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    var allFriends;
    
    //response.send(statusCodes.OK, { messages: "Success", userId: user_id});
    
    friendsTable.where( { sentby: user_id}).read(
        {
            success: function(res)
            {
                
                    response.send(statusCodes.OK, { messages: "Success", results: res});
                
            }
        }
        
    );
    
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};