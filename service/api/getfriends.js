exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    var allFriends;
    
    
    friendsTable.where( 
        
        
        
        function()
        {
            
            if (this.friend.indexOf(user_id) > -1)
            {
            
              return true; 
            }
        }
        
        ).read(
        {
            success: function(res)
            {
                response.send(statusCodes.OK, { messages: "Success", results: res});
                
            }
        }
        
    );
    
    
    
    
    
    
};
