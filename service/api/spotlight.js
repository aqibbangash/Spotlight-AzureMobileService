exports.post = function(request, response) {
    // Request body values
    var user_id     = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    var chat_type   = request.body.type;
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

    userTable.where({id : user_id}).read({
        success : function(users){
            if(users.length > 0){
                prefs = users[0];
                if(users[0].points > 0){
                 ////////////////////////////++++++++++++++++++
                     // Get all request type text and user_id equals user_id
        requestTable.where({type : chat_type, user_id : user_id}).read({
        success : function(requests){
         //response.send(statusCodes.OK, { message : requests[0] });  // Test log
            if(requests.length > 0){
                requests.forEach(function(request){
                    numAlready++;
                    requestId = request.id;
                    if(request.completed){
                        connectedWith = request.other_user;
                    }
                    ///////
                
                    //////
                });
            }
            else {
             //response.send(statusCodes.OK, { message : 'No request are present for this user.' });
            }
///////
            if(numAlready > 0){
                //response.send(statusCodes.OK, { message : numAlready });  // Test log
                // Requests by user exists
                if(connectedWith != ""){
                    // Request complete partner exists
                    // Find other user
                    userTable.where({id : connectedWith}).read({
                        success : function(users){
                            if(users.length > 0){
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
                    requestTable.where(function(u,abc,t){return this.user_id != u  && this.type == t && this.completed == false && (abc.indexOf(u) == -1);},user_id,abc,chat_type).read({
                        success : function(requests){
                            if(requests.length > 0){
                                 requests.forEach(function(request){
                                     onlineUsers.push(request.user_id);
                                 });
                                if(onlineUsers.length > 0){
                                    // Get online user
                                    userTable.where(function(ou){return this.id in ou;},onlineUsers).read({
                                        success : function(users){
                                            var usersList=users;
                                            var tempUserId;
                                            if(users.length > 0){
                                                traverse(usersList.pop()); // Initiale call
                                                function traverse(user){
                                                    countIDK++;
                                                    if(prefs.indexOf(user.gender) !== -1 && user.prefs.indexOf(userGender) !== -1){
                                                        // User found with your preference
                                                        // Find Request
                                                        requestTable.where({user_id : user.id, type : chat_type, completed : false, other_user : null}).read({
                                                            success : function(requests){
                                                                if(requests.length > 0){
                                                                    //console.log("if");
                                                                    // Update request
                                                                    tempUserId =user.id;
                                                                    requests[0].completed = true;
                                                                    requests[0].other_user = user_id;
                                                                    requestTable.update(requests[0],{
                                                                        success : function(request){
                                                                            if(request){
                                                                                var tempUser;
                                                                                // Find request of other user
                                                                                requestTable.where({user_id : user_id, type : chat_type, completed : false, other_user : null}).read({
                                                                                    success : function(requests){
                                                                                        if(requests.length > 0){
                                                                                            tempUser=requests;
                                                                                            console.log("user id : ",tempUserId);
                                                                                          userTable.where({id : tempUserId}).read({
                                                                                            success : function(users){
                                                                                              tempUser[0].completed = true;
                                                                                              tempUser[0].other_user = user.id;
                                                                                              requestTable.update(tempUser[0],{
                                                                                                  success : function(request){
                                                                                                      if(request){
                                                                                                           check = true;
                                                                                                           response.send(statusCodes.OK, {
                                                                                                           boolean        : true,
                                                                                                           requestId      : requestId,
                                                                                                           type           : '2. Partner exists and match first try',
                                                                                                           id             : users[0].id,
                                                                                                           full_name      : users[0].first_name+" "+users[0].last_name,
                                                                                                           gender         : users[0].gender,
                                                                                                           city           : users[0].city,
                                                                                                           country        : users[0].country,
                                                                                                           age            : users[0].age,
                                                                                                           profile_pic    : users[0].profile_pic,
                                                                                                           vip            : users[0].vip
                                                                                                           });
                                                                                                           //break;
                                                                                                      }
                                                                                                      else {
                                                                                                          request.completed = false;
                                                                                                          request.other_user = '';
                                                                                                          requestTable.update(request,{});
                                                                                                          traverse(usersList.pop());
                                                                                                      }
                                                                                                  }
                                                                                              });
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
                                                                    //console.log("else");
                                                                    // No requests found on critera
                                                                    requestTable.where(function(u,t){return this.user_id == u && this.other_user != null && this.other_user != '' && this.type == t && this.completed == true},user_id,chat_type).read({
                                                                        success : function(requests){
                                                                            if(requests.length > 0){
                                                                                // Find User
                                                                                userTable.where({id : request.other_user}).read({
                                                                                    success : function(users){
                                                                                        if(users > 0){
                                                                                             response.send(statusCodes.OK, {
                                                                                             boolean        : true,
                                                                                             requestId      : requestId,
                                                                                             type           : '3. Partner exists and match first try',
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
                                                                                            response.send(statusCodes.OK, { boolean : false, message : '1. No user matched your preference.'});
                                                                                            traverse(usersList.pop());
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                            else {
                                                                                response.send(statusCodes.OK, { boolean : false, message : '2. No user matched your preference.'});
                                                                                traverse(usersList.pop());
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });                                                    
                                                    }
                                                    else {
                                                        // No user found with your preference
                                                        response.send(statusCodes.OK, { boolean : false, message : '3. No user matched your preference.'});
                                                        traverse(usersList.pop());
                                                    }
                                                }// Traverse end 
                                            }
                                            else {
                                                // User not found
                                            }
                                        }
                                    });
                                }
                                else {
                                        response.send(statusCodes.OK, { boolean : false, message : '4. No online user available'});
                                }
                             }
                             else {
                                 // No requests
                                 response.send(statusCodes.OK, { boolean : false, message : '5. No online user available'});
                             }
                        }
                    });
                }
            }
            else {
                // No request by user exist
                //var milliSeconds = new Date().getTime();
                // Insert new request
                requestTable.insert({
                   // id : milliSeconds,
                    user_id : user_id,
                    completed : false,
                    type : chat_type
                },{
                    success : function(){
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
                        requestTable.where(function(u,abc,t){return this.user_id != u  && this.type == t && this.completed == false && (abc.indexOf(u) == -1);},user_id,abc,chat_type).read({
                            success : function(requests){
                                //response.send(statusCodes.OK, { haha : requests,test1: abc,test: (abc.indexOf(user_id) == -1)});
                                 if(requests.length > 0){
                                     requests.forEach(function(request){
                                         onlineUsers.push(request.user_id);
                                     });
                                     //console.log("yo yo online : ",onlineUsers);
                                    if(onlineUsers.length > 0){
                                        // Get online user
                                        userTable.where(function(ou){return this.id in ou;},onlineUsers).read({
                                            success : function(users){
                                                var usersList=users;
                                                if(users.length > 0){
                                                    traverse(usersList.pop()); // Initiale call
                                                    function traverse(user){
                                                        countIDK++;
                                                        if(prefs.indexOf(user.gender) !== -1 && user.prefs.indexOf(userGender) !== -1){
                                                            // User found with your preference
                                                            // Find Request
                                                            requestTable.where({user_id : user.id, type : chat_type, completed : false, other_user : null}).read({
                                                                success : function(requests){
                                                                    if(requests.length > 0){
                                                                        //console.log("if");
                                                                        // Update request
                                                                        requests[0].completed = true;
                                                                        requests[0].other_user = user_id;
                                                                        requestTable.update(requests[0],{
                                                                            success : function(request){
                                                                                if(request){
                                                                                    var tempUser;
                                                                                    // Find request of other user
                                                                                    requestTable.where({user_id : user_id, type : chat_type, completed : false, other_user : null}).read({
                                                                                        success : function(requests){
                                                                                            if(requests.length > 0){
                                                                                                tempUser=requests;
                                                                                              userTable.where({id : user.id}).read({
                                                                                                success : function(users){
                                                                                                  tempUser[0].completed = true;
                                                                                                  tempUser[0].other_user = user.id;
                                                                                                  requestTable.update(tempUser[0],{
                                                                                                      success : function(request){
                                                                                                          if(request){
                                                                                                               check = true;
                                                                                                               response.send(statusCodes.OK, {
                                                                                                               boolean        : true,
                                                                                                               requestId      : requestId,
                                                                                                               type           : '2. Partner exists and match first try',
                                                                                                               id             : users[0].id,
                                                                                                               full_name      : users[0].first_name+" "+users[0].last_name,
                                                                                                               gender         : users[0].gender,
                                                                                                               city           : users[0].city,
                                                                                                               country        : users[0].country,
                                                                                                               age            : users[0].age,
                                                                                                               profile_pic    : users[0].profile_pic,
                                                                                                               vip            : users[0].vip
                                                                                                               });
                                                                                                               //break;
                                                                                                          }
                                                                                                          else {
                                                                                                              request.completed = false;
                                                                                                              request.other_user = '';
                                                                                                              requestTable.update(request,{});
                                                                                                              traverse(usersList.pop());
                                                                                                          }
                                                                                                      }
                                                                                                  });
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
                                                                        //console.log("else");
                                                                        // No requests found on critera
                                                                        requestTable.where(function(u,t){return this.user_id == u && this.other_user != null && this.other_user != '' && this.type == t && this.completed == true},user_id,chat_type).read({
                                                                            success : function(requests){
                                                                                if(requests.length > 0){
                                                                                    // Find User
                                                                                    userTable.where({id : request.other_user}).read({
                                                                                        success : function(users){
                                                                                            if(users > 0){
                                                                                                 response.send(statusCodes.OK, {
                                                                                                 boolean        : true,
                                                                                                 requestId      : requestId,
                                                                                                 type           : '3. Partner exists and match first try',
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
                                                                                                response.send(statusCodes.OK, { boolean : false, message : '1. No user matched your preference.'});
                                                                                                traverse(usersList.pop());
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    response.send(statusCodes.OK, { boolean : false, message : '2. No user matched your preference.'});
                                                                                    traverse(usersList.pop());
                                                                                }
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });                                                    
                                                        }
                                                        else {
                                                            // No user found with your preference
                                                            response.send(statusCodes.OK, { boolean : false, message : '3. No user matched your preference.'});
                                                            traverse(usersList.pop());
                                                        }
                                                    }// Traverse end 
                                                }
                                                else {
                                                    // User not found
                                                }
                                            }
                                        });
                                    }
                                    else {
                                            response.send(statusCodes.OK, { boolean : false, message : '9. No online user available'});
                                    }                                     
                                 }
                                 else {
                                     // No requests
                                     response.send(statusCodes.OK, { boolean : false, message : '10. No online user available'});
                                 }
                            }
                        });

                    }
                });
            }    
        }
    });
                 //////////////////////////////------------------   
                }
                else {
                    // insufficient points
                    response.send(statusCodes.OK, { boolean : false, message : '10. Insufficient points'});
                }
            }
            else {
                // User dose not exists
            }
        }
    });
};
