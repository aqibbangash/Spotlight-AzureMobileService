exports.post = function(request, response) {
    
    var user_id     = request.body.user_id;
    var allFriends  = [];
    var totalNumber = 0;
    var onlineCount = 0;
    
    var friendsTable = request.service.tables.getTable('friends');
    var usersTable = request.service.tables.getTable('users');
    
    
    friendsTable.where(function(id){return this.friend.indexOf(id) != -1 ;},user_id).read({
        success : function(friends){
            //response.send(statusCodes.OK, {message: friends});
            if(friends.length > 0){
                friends.forEach(function(friend){
                    console.log("Friends : ",friends);
                    totalNumber++;
                    
                    var id = friend.friend.replace(user_id,"");
                    console.log("Id : ",id);
                   
                });
            }
            else {
                // no friends found
                response.send(statusCodes.OK, {message: "No freinds for this user."});
            }
        }
    });
};
