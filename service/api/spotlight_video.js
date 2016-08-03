exports.post = function(request, response) {
    // Request body values
    var user_id      = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // Local variables
    var blockedUsers    = "";
    var numAlready      = 0;
    var connectedWith   = "";
    var countIDK        = 0;
    var check           = false;     
    var requestId       = "";
    //var temp            = [];
    //var onlineUsers     = [];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
    var requestTable    = request.service.tables.getTable('Request');
    var blockTable    = request.service.tables.getTable('Block');
    
    // Get all requests 
    requestTable.where({user_id : user_id, type : 'video'}).read({
        success : function(requests){
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
                // No requests present    
            }
            //  requests exsists
            if(numAlready > 0){
                // Partner exists
                if(connectedWith != null){
                    userTable.where({id : connectedWith}).read({
                        success : function(user){
                            if(user){
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
                        }
                    });
                }
                else {
                    // Get all blocked users
                    blockTable.where(function(u){return this.user_id.indexOf(user_id) !== -1;},user_id).read({
                        success : function()
                    });
                }
            }
            // No request exists
            else {
                
            }
        }
    });
    
    
};