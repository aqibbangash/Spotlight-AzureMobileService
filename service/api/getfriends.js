exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    
    
    friendsTable.where( { friend:{like:user_id}}).read(
        
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
    
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};