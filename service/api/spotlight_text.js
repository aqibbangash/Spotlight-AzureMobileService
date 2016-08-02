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
            // User request exists
            if(numAlready > 0){
                // Request complete
                if(connectedWith != null){
                    // get user with id equals connectedwith
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
                // Connected with is null
                else {
                    // Get all blocked users
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
                        }
                    });
                    
                    // Get online user
                    requestTable.where(function(u,t){return this.user_id != u && this.type == 'text' && this.user_id.indexOf(t) == -1 && this.completed == false},userId,temp).read({
                        success : function(requests){
                            requests.forEach(function(request){
                                onlineUsers.push(request.user_id);
                            });
                            if(onlineUsers.count > 0){
                                userTable.where(function(){return onlineUsers.indexOf(this.id)!==-1}).read({
                                        success : function(users){
                                            if(users.length > 0){
                                            users.forEach(function(user){
                                                countIDK++;
                                                
                                                if(prefs.indexOf(user.gender) != false && user.prefs.indexOf(userGender) != false){
                                                    requestTable.where({type : 'text', user_id : userId, completed : false, other_user : null}).read({
                                                       success: function(requests){
                                                            if(requests.lenght > 0){
                                                                requests.forEach(function(request){
                                                                    request.completed = true;
                                                                    request.other_user = userId;
                                                                    requestTable.update(request,{
                                                                       success : function(res){
                                                                         response.send(statusCodes.OK, { 
                                                                             boolean        : true,
                                                                             requestId      : requestId,
                                                                             type           : 'Existed and matched after trying 1',
                                                                             id             : user.id,
                                                                             full_name      : user.first_name+" "+user.last_name,
                                                                             gender         : user.gender,
                                                                             city           : user.city,
                                                                             country        : user.country,
                                                                             age            : user.age,
                                                                             profile_pic    : user.profile_pic, 
                                                                             vip            : user.vip
                                                                         }); 
                                                                         check = true;
                                                                         break;
                                                                       } 
                                                                    });
                                                                });
                                                            }
                                                            else {
                                                                requestTable.where({type : 'text' , user_id : userId, completed : true}).read({
                                                                    success : function(requests){
                                                                        if(requests.length > 0){
                                                                            requests.forEach(function(request){
                                                                                request.completed = false;
                                                                                request.other_user = '';
                                                                                requestTable.update(request,{
                                                                                    success : function(){
                                                                                        // nothing
                                                                                    }
                                                                                });
                                                                            });
                                                                        }
                                                                        else {
                                                                            requestTable.where(function(u){return this.user_id == userId && this.other_user != null && this.type == 'text' && this.completed = true;}).read({
                                                                                success : function(requests){
                                                                                    if(requests.length > 0){
                                                                                        requests.forEach(function(request){
                                                                                            userTable.where({id : request.other_user}).read({
                                                                                                success : function(user){
                                                                                                    if(user != null){
                                                                                                        if(user.gender != null){
                                                                                                            response.send(statusCodes.OK, { 
                                                                                                             boolean        : true,
                                                                                                             requestId      : requestId,
                                                                                                             type           : 'Existed and matched after trying 2',
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
                                                                                                        else {
                                                                                                            response.send(statusCodes.OK, { 
                                                                                                             boolean        : true,
                                                                                                             requestId      : requestId,
                                                                                                             type           : 'Line 122',
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
                                                                                                    }
                                                                                                    else {
                                                                                                        response.send(statusCodes.OK, { 
                                                                                                         boolean        : true,
                                                                                                         requestId      : requestId,
                                                                                                         type           : 'Line 126',
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
                                                                                                }
                                                                                            });
                                                                                        });   
                                                                                    }
                                                                                    else { 
                                                                                        response.send(statusCodes.OK, { boolean : false , message : 'No user matched your preferences. 1' });                                    
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                    }
                                                                });
                                                            }                                                    
                                                       } 
                                                    }); 
                                                }
                                                else {
                                                    response.send(statusCodes.OK, { boolean : false , message : 'No online user matched your preferences. 1' });
                                                }
                                            });                                            
                                        }
                                        else {
                                            response.send(statusCodes.OK, { boolean : false , message : 'No online user matched your preferences.' });    
                                        }
                                    }
                                });
                            }
                            // No user available
                            else {
                                response.send(statusCodes.OK, { boolean : false , message : 'No online user available' });
                            }
                        }
                    });    
                }    
            }
            // User dose not exists
            else {
                
            }
        }    
    });
    
    //response.send(statusCodes.OK, { message : 'Hello World!' });
};