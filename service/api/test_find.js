exports.post = function(request, response) {

    var onlineUsers    = ["6990"];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
        //var test = function(obj){return onlineUsers.indexOf(obj) != -1;}
        //function(ou){return ou.search(this.id) != -1;},onlineUsers
        onlineUsers.forEach(function(onlineUser){
            userTable.where({id : onlineUser}).read({
                success : function(users){
                    response.send(statusCodes.OK, { message : users });
                }            
            }); 
        });
};