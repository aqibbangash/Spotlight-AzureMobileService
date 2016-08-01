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
    requestTable.where({ }).read({
       success : function(res){
            response.send(statusCodes.OK, { message : res,userid:userId });    
       } 
    });
};
