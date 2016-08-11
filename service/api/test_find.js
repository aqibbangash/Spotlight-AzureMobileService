exports.post = function(request, response) {

    var onlineUsers    = ['6990'];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');

        userTable.where(function(ou){return ou.indexOf(this.id) != -1;},onlineUsers).read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};