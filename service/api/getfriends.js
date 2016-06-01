exports.post = function(request, response) {
    
    var user_id = request.body.user_id;
    var friendsTable = request.service.tables.getTable('friends');
    var usersTable = request.service.tables.getTable('users');
    
    var allFriends = "";//String];
    
    var friendsFull = [];
    
    
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
                   // allFriends.push(user_id)
                   
                   allFriends += user_id+"||"
                }
                
                //response.send(statusCodes.OK, { messages: "Success", results: allFriends});
                
                usersTable.where(
                    function(allFriends)
                        {
                            
                            console.log(this.id);
                            
                            //return (  allFriends.indexOf(this.id) > -1 ) ;
                            return 1==1;
                        }, allFriends).read(
                    {
                    success: function(r)
                    {
                        response.send(statusCodes.OK, {message: "Success", result: r});
                    }
                    
                    
                    }   
                );
            }
        }
        
    );
    
    
    
    
    
    
};
