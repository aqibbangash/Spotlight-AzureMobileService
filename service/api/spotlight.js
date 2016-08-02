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
    // Table
    var userTable   = request.service.tables.getTable('Users');  
    var requestTable = request.service.tables.getTable('Request');  
    var blockTable = request.service.tables.getTable('Block');  
    
    // Get All requests with user_id equal user_id
    requestTable.where({user_id : user_id}).read({
        success : function(requests){
            requests.forEach(function(request){
                numAlready++;
                
                if(request.completed){
                    connectedWith = request.other_user;
                }
            });
            
            if(numAlready > 0){
                if(connectedWith != null){
                    response.send(statusCodes.OK, { match_id : connectedWith });                
                }
                else {
                    requestTable.where(function(u){return this.user_id != u && this.completed == false;},user_id).read({
                        success : function(requests){
                            requests.forEach(function(request){
                                onlineUsers.push(request.user_id);
                            });
                            
                            if(onlineUsers.count  > 0){
                                userTable.where(function(u){return onlineUsers.IndexOf(u) !== -1;}).read({
                                    success : function(users){
                                        if(users.count > 0){
                                            countIDK++;
                                            
                                            users.forEach(function(user){
                                                if(prefs.indexOf(user.gender) !== -1 && user.prefs.indexOf(userGender) !== -1){
                                                    requestTable.where({user_id : user_id, completed : 0, other_user : null}).read({
                                                        success : function(requests){
                                                            requests[0].completed = 1;
                                                            requests[0].other_user = user.id;
                                                            requestTable.update(requests[0],{
                                                                success : function(res){
                                                                    if(res.count > 0){
                                                                        requestTable.where({user_id : user.id, completed : 0, other_user : null}).read({
                                                                            success : function(requests){
                                                                                requests[0].completed = 1;
                                                                                requests[0].other_user = user.id;
                                                                                requestTable.update(requests[0],{
                                                                                    success : function(){
                                                                                        response.send(statusCodes.OK, { boolean : true , match_id : user.id });   
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                    else {
                                                                        
                                                                    }
                                                                }
                                                            }); 
                                                        }
                                                    });           
                                                }
                                            });
                                        }
                                        else {
                                            
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });
    
    response.send(statusCodes.OK, { message : 'Hello World!' });
};

