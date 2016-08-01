exports.post = function(request, response) {
    // Request body values
    var userId      = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // Local variables
    var blockedUsers    = "";
    var numAlready      = 0;
    var connectedWith   = "";
    var countIDK        = 0;
    var check           = false;     
    var requestId       = "";
    var temp            = [];
    var onlineUsers     = [];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
    var requestTable    = request.service.tables.getTable('Request');
    var blockTable    = request.service.tables.getTable('Block');
    
    // Get all requests of type text
    requestTable.where({type : 'text',user_id : userId}).read({
        success : function(requests){
            requests.forEach(function(request){
                numAlready++;
                requestId = request.id;
                if(request.completed){
                    connectedWith = request.other_user;
                }
            });
            if(numAlready > 0){
                if(connectedWith != null){
                    userTable.where({id : connectedWith}).read({
                        success : function(user){
                         response.send(statusCodes.OK, { 
                             boolean        : true,
                             requestId      : requestId,
                             type           : 'Exist and match first try',
                             id             : user.id,
                             full_name      : user.first_name+" "+user.last_name,
                             gender         : user.gender,
                             city           : user.city,
                             country        : user.country,
                             age            : user.age,
                             profile_pic    : user.profile_pic, 
                             vip            : user.vip
                             });   
                        }
                    });
                }
                else {
                    blockTable.where(function(u){return this.both.indexOf(userId) !== -1},userId).read({
                        succes : function(blocks){
                            blocks.forEach(function(block){
                                if(block.blocker == userId){
                                    temp.push(block.blocky);       
                                }
                                else { 
                                    temp.push(block.blocker);
                                }
                            });
                            requestTable.where(function(u,t){return this.user_id != u && this.type == 'text' && this.user_id.indexOf(t) == -1 && this.completed == false},userId,temp).read({
                                success : function(requests){
                                    requests.forEach(function(request){
                                        onlineUsers.push(request.user_id);
                                    });
                                    if(onlineUsers.count > 0){
                                        userTable.where(function(){return onlineUsers.indexOf(this.id)!==-1}).read({
                                            success : function(users){
                                                users.forEach(function(user){
                                                    countIDK++;
                                                    
                                                    if(prefs.indexOf(user.gender) != false && user.prefs.indexOf(userGender) != false){
                                                        requ
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
            }
        }    
    });
    
    //response.send(statusCodes.OK, { message : 'Hello World!' });
};