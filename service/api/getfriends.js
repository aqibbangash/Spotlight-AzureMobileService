exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    var allFriends;
    
    
    friendsTable.where( 
        
        function(currentItem){ 
            
            response.send(statusCodes.OK, { messages: "Success", results: currentItem});
            
//                if (currentItem.friend.indexOf(this.user_id))
//                {
//                    return true
//                }
                
            }, user_id ).read(
        {
            success: function(res)
            {
                response.send(statusCodes.OK, { messages: "Success", results: res});
                
            }
        }
        
    );
    
    
    
    
    
    
};
