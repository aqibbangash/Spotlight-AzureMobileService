exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    var allFriends = [];
    
    
    friendsTable.where( 
        
        
        
        function(u)
        {

            
            return (this.friend.indexOf(u) > -1)
        
        }, user_id
        
        ).read(
        {
            success: function(res)
            {
                
                var i = 0;
                for (i; i<res.length; i++)
                {
                    allFriends.push(res[i].friend.replace(user_id, ""));
                }
                
                response.send(statusCodes.OK, { messages: "Success", results: res});
            }
        }
        
    );
    
    
    
    
    
    
};
