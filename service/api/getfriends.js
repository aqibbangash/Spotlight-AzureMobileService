exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    
    var allFriends;
    
    
    friendsTable.where( 
        
        
        
        function()
        {
            
            //return 1==1;
            return this.friend.indexOf(user_id)
            
        }
        
//            this.friend.indexOf(user_id)
//        function(currentItem){ 
//            
//                if (this.friend != null)
//                {
//                    return true
//                }
//                
//            }, user_id
//            
            
             ).read(
        {
            success: function(res)
            {
                response.send(statusCodes.OK, { messages: "Success", results: res});
                
            }
        }
        
    );
    
    
    
    
    
    
};
