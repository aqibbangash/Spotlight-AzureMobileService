exports.post = function(request, response) {
    // Request body values
    var user_id     = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // local variable
    var blockUsers     =   "";
    var numAlready     = 0;
    var connectedWith  = "";
    var countIDK       = 0;
    var check          = false;     
    
    var requestId      = "";
    var abc            = [];
    var onlineUsers    = [];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
    var requestTable = request.service.tables.getTable('Request');
    var blockTable   = request.service.tables.getTable('Block');
    
    // Get all request type text and user_id equals user_id
        requestTable.where({type : 'text', user_id : user_id}).read({
        success : function(requests){
         //response.send(statusCodes.OK, { message : requests[0] });  // Test log 
            if(requests.length > 0){
                requests.forEach(function(request){
                    numAlready++;
                    requestId = request.id;
                    if(request.completed){
                        connectedWith = request.other_user;
                    }
                });
            }
            else {
             response.send(statusCodes.OK, { message : 'No request are present for this user.' });   
            }
            
            if(numAlready > 0){
                //response.send(statusCodes.OK, { message : numAlready });  // Test log 
                // Requests by user exists
                if(connectedWith != ""){
                    // Request complete partner exists
                    // Find other user
                    userTable.where({id : connectedWith}).read({
                        success : function(users){
                            if(users.lenght > 0){
                                // Other user found
                             response.send(statusCodes.OK, { 
                             boolean        : true,
                             requestId      : requestId,
                             type           : '1. Partner exists and match first try',
                             id             : users[0].id,
                             full_name      : users[0].first_name+" "+users[0].last_name,
                             gender         : users[0].gender,
                             city           : users[0].city,
                             country        : users[0].country,
                             age            : users[0].age,
                             profile_pic    : users[0].profile_pic, 
                             vip            : users[0].vip
                             });   
                            }
                            else {
                                // Other user not found
                                response.send(statusCodes.OK, { message : 'Sorry we could not find your partner id.' });  
                            }
                        }
                    });
                }
                else {
                    // No partner for request
                    // Get block list 
                    blockTable.where(function(u) {return this.both.indexOf(u) !== -1;},user_id).read({
                        success : function(blocks){
                            //response.send(statusCodes.OK, { message : blocks });  // Test log 
                            if(blocks.lenght > 0){
                                blocks.forEach(function(block){
                                    if(block.blocker == user_id){
                                        abc.push(block.blocky);    
                                    }
                                    else {
                                        abc.push(block.blocker);
                                    }
                                });
                            }
                           // else {
                           //     response.send(statusCodes.OK, { message : 'No block for user.' });
                           // }
                        }
                    });
                    // Get Online users
                    requestTable.where(function(u,abc){return this.user_id != u  && this.type == 'text' && this.completed == false && (abc.indexOf(u) == -1);},user_id,abc).read({
                        success : function(requests){
                            //response.send(statusCodes.OK, { haha : requests,test1: abc,test: (abc.indexOf(user_id) == -1)});
                             if(requests.length > 0){
                                 requests.forEach(function(request){
                                     onlineUsers.push(request.user_id); 
                                 });
                             }
                             else {
                                 // No requests
                                 response.send(statusCodes.OK, { boolean : false, message : 'No online user available'});
                             }
                        }
                    });
                    
                    if(onlineUsers > 0){
                        // Get online user
                        userTable.where(function(u,ou){return ou.indexOf(u) !== -1;},user_id,onlineUsers).read({
                            success : function(users){
                                if(users.length > 0){
                                    // found online users
                                    users.forEach(function(user){
                                        countIDK++;
                                        // Find user with your preference 
                                        if(prefs.indexOf(user.gender) !== -1 && user.pref.indexOf(userGender) !== -1){
                                            // User found with your preference
                                            // Find Request 
                                            requestTable.where({user_id : user.id, type : 'text', completed : false, other_user : null}).read({
                                                success : function(requests){
                                                    if(requests.length > 0){
                                                        // Update request
                                                        requests[0].completed = true;
                                                        requests[0].other_user = user.id;
                                                        requestTable.update(requests[0],{
                                                            success : function(request){
                                                                if(request){
                                                                    // Find request of other user
                                                                    requestTable.where({user_id : user_id, type : 'text', completed : false, other_user : null}).read({
                                                                        success : function(requests){
                                                                            if(requests.length > 0){
                                                                                requests[0].completed = true;
                                                                                requests[0].other_user = user_id;
                                                                                requestTable.update(requests[0],{
                                                                                    success : function(request){

                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                // error
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                                else{
                                                                    // error
                                                                }
                                                            }
                                                        }); 
                                                    }
                                                    else {
                                                        // No requests found on critera 
                                                    }
                                                }
                                            });
                                        }
                                        else {
                                            // No user found with your preference
                                            response.send(statusCodes.OK, { boolean : false, message : 'No user matched your preference.'});
                                        }
                                    });
                                }
                                else {
                                    // User not found
                                }
                            }
                        });
                    }
                    else {
                            response.send(statusCodes.OK, { boolean : false, message : 'No online user available'});
                    }
                }
            }
            else {
                // No request by user exist
            }
        }    
    });
    
    
};

    