exports.post = function(request, response) {
    // Requst body values
    var user_id     = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // Local variables
    var blockedUsers    = "";
    var numAlready      = 0;
    var connectedWith   = "";
    var countIDK        = 0;
    // Table
    
    response.send(statusCodes.OK, { message : 'Hello World!' });
};

