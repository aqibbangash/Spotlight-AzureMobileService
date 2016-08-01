exports.post = function(request, response) {
    // Request body values
    var userId        = request.body.user_id;
    var userGender    = request.body.gender;
    var preference    = request.body.preference;
    // Local Variable
    var blockedUsers  = "";
    var numAlready    = 0;
    var connectedWith = "";
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
                    
                },{});
                
            }
            //response.send(statusCodes.OK, { message : res,userid:userId });    
       } 
    });
};
