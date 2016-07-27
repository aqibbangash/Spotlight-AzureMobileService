exports.post = function(request, response) {
    // Tables
    var userTable    = request.service.tables.getTable('Users');  

        userTable.where({
            id       : request.body.user_id
        }).read({
            success: function(results) {
                        if (results.length > 0) {
                             results[0].password=request.body.newPassword;
                             userTable.update(results[0],{
                                         success:function(res){
                                                    response.send(statusCodes.OK, { result : res});
                                                } 
                            });
                        } 
                        else {
                              response.send(statusCodes.OK, { result : "No such user exists."});
                        }
                }
        });
};

