exports.post = function(request, response) {
    var user_id     = request.body.user_id;
    var userGender  = request.body.gender;
    var prefs       = request.body.prefs;
    // local variable
    var onlineUsers    = ['6990'];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');

        userTable.where(function(ou,obj){return ou.indexOf(obj.id) != -1;},onlineUsers,this).read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};