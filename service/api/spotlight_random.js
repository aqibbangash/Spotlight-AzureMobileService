exports.post = function(request, response) {
    // Request body values
    var userId        = request.body.user_id;
    var userGender    = request.body.gender;
    var preference    = request.body.preference;
    var blockedUsers  = "";
    var numAlready    = 0;
    var connectedWith = "";
    // Tables
    var requestTable    = request.service.tables.getTable('Requests');  
    var blockTable    = request.service.tables.getTable('Block');  
    var userTable    = request.service.tables.getTable('Users');  
    
    requestTable.where({__deleted : false, id : userId},{
       success : function(_requests){
       response.send(statusCodes.OK, { message : _requests });    
       } 
    });
};
