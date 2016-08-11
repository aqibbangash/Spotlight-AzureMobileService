exports.post = function(request, response) {
    var user_id     = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // local variable
    var onlineUsers    = ['6990'];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');

        userTable.where().read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};