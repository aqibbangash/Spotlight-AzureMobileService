exports.post = function(request, response) {

    var onlineUsers    = ["6990"];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
        //var test = function(obj){return onlineUsers.search(obj) != -1;}
        userTable.where(function(ou){return onlineUsers.search(this.id) != -1;},onlineUsers).read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};