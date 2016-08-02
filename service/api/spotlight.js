exports.post = function(request, response) {
    // Requst body values
    var user_id     = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // Local variables
    var blockedUsers    = "";
    var numAlready      = 0;
    var connectedWith   = "";
    var countIDK        = 0;
    var onlineUsers     = [];
    var temp            = "";
    // Table
    var userTable   = request.service.tables.getTable('Users');  
    var requestTable = request.service.tables.getTable('Request');  
    var blockTable = request.service.tables.getTable('Block');  
    
    // Check requests by user_id
    // Get All requests with user_id equal user_id
    requestTable.where({user_id : user_id}).read({
        success : function(requests){
            requests.forEach(function(request){
                numAlready++;
                if(request.completed){
                    connectedWith = request.other_user;
                }
            });
            // Already have a partner or new partner
            if(numAlready > 0){
                // Already have a partner
                if(connectedWith != null){
                    response.send(statusCodes.OK, { match_id : connectedWith });                
                }
                // New pertner
                else {
                    // Get all blocked users with user_id
                     blockTable.where(function(u){return this.both.indexOf(u) !== -1;},user_id).read({
                         success : function(blocks){
                             blocks.forEach(function(block){
                                 temp = block.both;
                                 if(blockedUsers.indexOf(temp) !== -1){
                                     blockedUsers += block.both+".";
                                 }
                             });
                         }
                     });
                     // Get all online users  
                    requestTable.where(function(u){return this.user_id != u && this.completed == false;},user_id).read({
                        success : function(requests){
                            requests.forEach(function(request){
                                onlineUsers.push(request.user_id);
                            });
                            if(onlineUsers.length  > 0){
                                // Get all online users
                                userTable.where(function(u){return onlineUsers.toString().indexOf(u) !== -1;}).read({
                                    // Search for partner
                                    success : function(users){
                                        if(users.length > 0){
                                            users.forEach(function(user){
                                                countIDK++;
                                                if(prefs.indexOf(user.gender) !== -1 && user.prefs.indexOf(userGender) !== -1){
                                                    // Found partner updating request table
                                                   requestTable.where({user_id : user_id, completed : 0, other_user : null}).read({
                                                         // Add other_user id, update complete status true
                                                        success : function(requests){
                                                            requests[0].completed = 1;
                                                            requests[0].other_user = user.id;
                                                            requestTable.update(requests[0],{
                                                                success : function(res){
                                                                    // If partner is found
                                                                    requestTable.where({user_id : user.id, completed : 0, other_user : null}).read({
                                                                        success : function(requests){
                                                                            if(requests.length > 0){
                                                                                response.send(statusCodes.OK, { boolean : true , match_id : user.id });   
                                                                            }
                                                                            // No partner found
                                                                            else {
                                                                                requestTable.where({user_id : user_id , completed : true}).read({
                                                                                    succeess : function(requests){
                                                                                        requests[0].completed = false;
                                                                                        requests[0].other_user = '';
                                                                                        requestTable.update(requests[0],{
                                                                                            success : function(res){
                                                                                                // nothing
                                                                                            }
                                                                                        }); 
                                                                                    }
                                                                                });                                                                                    
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }); 
                                                        }
                                                    });           
                                                }
                                            });
                                        }
                                        else {
                                            response.send(statusCodes.OK, { boolean : false , message : 'No online user matched your preference.' });
                                        }
                                    }
                                });
                            }
                            else {
                                response.send(statusCodes.OK, { boolean : false , message : 'No online user available.' });
                            }
                        }
                    });
                }
            }
            else {
                // No request exists
                // create new request
                requestTable.insert({
                    user_id     : user_id,
                    type        : 'text',
                    completed   : false,
                    other_user  : null
                },{
                    // Checking blockages
                    success: function(obj){
                        blockTable.where(function(u){return this.both.indexOf(u) !== -1;}).read({
                            // Make block user list
                            success : function(blocks){
                                blocks.forEach(function(block){
                                    temp = block.both;
                                    if(blockedUsers.indexOf(temp) !== -1){
                                        blockedUsers += block.both+'.';
                                    }
                                });
                                
                            }
                        });
                    }
                });                
            }
        }
    });
    
    response.send(statusCodes.OK, { message : 'Hello World!' });
};

