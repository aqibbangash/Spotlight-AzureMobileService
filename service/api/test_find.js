exports.post = function(request, response) {

    var onlineUsers    = ['6990'];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
        var test = function(obj){return onlineUsers.toString().indexOf(obj) != -1;}
        userTable.where(test(this.id)).read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};