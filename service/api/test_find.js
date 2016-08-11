exports.post = function(request, response) {

    var onlineUsers    = ['6990'];    
    // Tables
    var userTable    = request.service.tables.getTable('Users');
        var test = function(ou,obj){console.log("this : ",obj) ;return obj.id.indexOf(ou) != -1;}
        userTable.where(test(onlineUsers,this)).read({
            success : function(users){
                response.send(statusCodes.OK, { message : users });
            }            
        });
};