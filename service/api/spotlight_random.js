exports.post = function(request, response) {
    // Request body values
    var userId        = request.body.user_id;
    var userGender    = request.body.gender;
    var preference    = request.body.preference;
    // Local Variable
    var blockedUsers  = "";
    var numAlready    = 0;
    var connectedWith = "";
    var onlineUsers   = [];  
    // Tables
    var requestTable    = request.service.tables.getTable('Request');  
    var blockTable    = request.service.tables.getTable('Block');  
    var userTable    = request.service.tables.getTable('Users');  
    // Get all records with __deleted values false and id equals userId
    requestTable.where({user_id : userId}).read({
       success : function(requests){
            requests.forEach(function(request){
                numAlready++;
                connectedWith=request.other_user;
            });
            
            if(numAlready > 0){
                //console.log("other user exists");
                if(connectedWith != null){
                    response.send(statusCodes.OK, { match_id : connectedWith });
                }
                else{
                    response.send(statusCodes.OK, { messsage : 'No one has joined yet.' });
                }
            }
            else{
                // console.log("Not exists");
                // Put text request
                requestTable.insert({
                    user_id     : userId,
                    type        : 'text',
                    completed   : false,
                    other_user  : null
                },{
                    success: function(req){
                        response.send(statusCodes.OK, { message : req });
                        // console.log("Request has been made.")
                    }
                });
                
                // Check blocking
                // Get record if userId is present in Both column
                 blockTable.where(function(u){return this.both.indexOf(u)!==-1;},userId).read({
                     success : function(blocks){
                         blocks.forEach(function(block){
                             var temp = block.both;
                             if(blockedUsers.indexOf(temp) !== -1){
                                 blockedUsers += block.both+'.';
                             }
                         });
                         // console.log('Blocked by : ',blockedUsers);
                     }
                 });
                // Get all online users
                requestTable.where(function(u){return this.user_id != u && this.completed == false},userId).read({
                    success : function(requests){
                        requests.forEach(function(request){
                           onlineUsers.push(request.user_id) 
                        });
                    }
                });
                // Get All online users Details
                userTable.where(function(u){return onlineUsers.toString().indexOf(this.id)}).read({
                    success : function(users){
                       if(users.count > 0){
                            console.log("Online users count : ",onlineUsers.count);
                            console.log("Online users : ",onlineUsers);
                           
                           users.forEach(function(user){
                               console.log("Searching for partner with id :  "+ user.id +" with gender : "+ user.gender +" with prefernce : "+user.prefs);
                            
                                if(user.prefs.indexOf !== -1 && user.prefs.indexOf !== -1){
                                    console.log("Matched");
                                }
                                else{
                                    console.log("Didn't match.")
                                }    
                           });
                       }
                    }  
                });
            }  
       } 
    });
};
