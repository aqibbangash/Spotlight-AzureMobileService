exports.post = function(request, response) {

    var onlineUsers    = ["6990","23091"];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
        //var test = function(obj){return onlineUsers.search(obj) != -1;}
        userTable.where(function(ou){return this.id in ou;},onlineUsers).read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};