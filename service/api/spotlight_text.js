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
                     //var temp= (abc.indexOf(user_id));// User id not in abc
                    // Get Online users
                    requestTable.where(function(u,abc){return this.user_id != u  && this.type == 'text' && this.completed == false && (abc.indexOf(u) == -1);},user_id,abc).read({
                        success : function(requests){
                            //response.send(statusCodes.OK, { haha : requests,test1: abc,test: (abc.indexOf(user_id) == -1)});
                                if(requests.length > 0){
                                // Online users preasent 
                                // Get online user 
                                userTable.where(function(u,onlineUser){return onlineUser.indexOf(u) !== -1},user_id,onlineUsers).read({
                                    success : function(users){
                                        if(users.length > 0){
                                            users.forEach(function(user){
                                                countIDK++;
                                                // Find user with same preference 
                                                if(prefs == user.gender && user.prefs == userGender){
                                                    requestTable.where({user_id : user.id, type : 'text', completed : false, other_user : null}).read({
                                                        success : function(users){
                                                            if(users.length > 0){
                                                                // Update request
                                                                users[0].other_user = user_id;
                                                                users[0].completed = true;
                                                                requestTable.update(users[0],{
                                                                    success : function(request){
                                                                         response.send(statusCodes.OK, { 
                                                                         boolean        : true,
                                                                         requestId      : requestId,
                                                                         type           : 'Partner exists and match first try',
                                                                         id             : request.id,
                                                                         full_name      : request.first_name+" "+request.last_name,
                                                                         gender         : request.gender,
                                                                         city           : request.city,
                                                                         country        : request.country,
                                                                         age            : request.age,
                                                                         profile_pic    : request.profile_pic, 
                                                                         vip            : request.vip
                                                                         });
                                                                         check = true;
                                                                         break; // Exit from foreach                                                                        
                                                                    }
                                                                }); 
                                                            }
                                                            else {
                                                                requestTable.where({type : 'text', user_id : user_id, completed : true}).read({
                                                                    success : function(requests){
                                                                        if(requests.length > 0){
                                                                            requests[0].other_user = '';
                                                                            requests[0].completed = false;
                                                                            requestTable.update(requests[0],{
                                                                                success : function(request){
                                                                                    // Nothing
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
                                                else{
                                                    response.send(statusCodes.OK, { boolean : false, message : 'Can not find someone with your preference.'});
                                                }
                                            });
                                        }
                                        else {
                                            // No online user
                                        }
                                    }
                                });
                            }
                            else {
                                // No online users
                                response.send(statusCodes.OK, { haha : requests});
                                response.send(statusCodes.OK, { boolean : false, message : 'No online user available'});
                            }

                        }
                    });
                }
            }
            else {
                // No request by user exist
            }
        }    
    });
    
    
};

    