exports.post = function(request, response) {
    
    var user_id     = request.body.user_id;
    var allFriends  = [];
    var totalNumber = 0;
    var onlineCount = 0;
    
    var friendsTable = request.service.tables.getTable('friends');
    var usersTable = request.service.tables.getTable('Users');
    var onlineTable = request.service.tables.getTable('online');
    
    
    friendsTable.where(function(id){return this.friend.indexOf(id) != -1 ;},user_id).read({
        success : function(friends){
            //response.send(statusCodes.OK, {message: friends});
            if(friends.length > 0){
                friends.forEach(function(_friend){
                    totalNumber++;
                    var id = _friend.friend.replace(user_id,"");
                    var oneFriend = [];
                    oneFriend['id'] = id;
                    console.log("1 : ",oneFriend);
                    if(_friend.sentby == id){
                        oneFriend['full_name'] = _friend.sendername;
                    }
                    else {
                        oneFriend['full_name'] = _friend.receivername;
                    }
                    
                    usersTable.where({id : id}).read({
                        success : function(users){
                            console.log("2 : ",users);
                            if(users.length > 0){
                                oneFriend['gender']         = _friend.gender;
                                oneFriend['profile_pic']    = _friend.profile_picl
                                oneFriend['city']           = _friend.city;
                                oneFriend['country']        = _friend.country;
                                oneFriend['age']            = _friend.age;
                                oneFriend['vip']            = _friend.vip;
                            }
                            onlineTable.where({userId : id}).read({
                                success : function(onlineUsers){
                                    if(onlineUsers.length > 0){
                                        onlineUsers.forEach(function(){
                                            onlineCount++;
                                        });
                                        
                                        if(onlineCount > 0){
                                            oneFriend['online_status'] = 'online';
                                        }
                                        else {
                                            oneFriend['online_status'] = 'offline';
                                        }
                                        allFriends.push(oneFriend);
                                        
                                        response.send(statusCodes.OK, {onlineFriends: allFriends});
                                    }
                                    else {
                                        // no online user
                                    }
                                }    
                            });
                                
                        }
                    });
                });
            }
            else {
                // no friends found
                response.send(statusCodes.OK, {message: "No freinds for this user."});
            }
        }
    });
};
