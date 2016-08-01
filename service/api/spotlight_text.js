exports.post = function(request, response) {
    // Request body values
    var userId      = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // Local variables
    var blockedUsers    = "";
    var numAlready      = 0;
    var connectedWith   = "";
    var countIDK        = 0;
    var check           = false;         
    // Tables
    
    response.send(statusCodes.OK, { message : 'Hello World!' });
};