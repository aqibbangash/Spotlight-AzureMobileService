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
    var abc           = [];
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
                             type           : 'Partner exists and match first try',
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
                     var temp= (abc.indexOf(user_id) == -1);// User id not in abc
                    // Get Online users
                    requestTable.where(function(u){return this.user_id != u  && this.type == 'text' && this.completed == false && temp;},user_id).read({
                        success : function(requests){
                            response.send(statusCodes.OK, { haha : requests});
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

    