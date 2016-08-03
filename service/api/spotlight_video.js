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
    //var requestId       = "";
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
                                    boolean : true 
                                    });    
                            }
                        }
                    });
                }
            }
            // No request exists
            else {
                
            }
        }
    });
    
    
};