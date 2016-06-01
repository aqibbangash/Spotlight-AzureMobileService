exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    var allFriends;
    
    
    friendsTable.where( 
        
        function(currentItem){ 
            
           // response.send(statusCodes.OK, { messages: "Success", results: currentItem});
            
                if (this.friend.indexOf(currentItem))
                {
                    return true
                }
                else
                {
                    return false
                }
                
            }, user_id ).read(
        {
            success: function(res)
            {
                response.send(statusCodes.OK, { messages: "Success", results: res});
                
            }
        }
        
    );
    
    
    
    
    
    
};
