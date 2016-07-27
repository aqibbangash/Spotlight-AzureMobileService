exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var userTable    = request.service.tables.getTable('Users');  

        userTable.where({
            id: userId
        }).read({
            success: function(results) {
                if (results.length > 0) {
                    results[0].vip=1;
                    userTable.update(results[0],{
                       success:function(res){
                            response.send(statusCodes.OK, { result : res});
                       } 
                    });
                } else {
                    console.log('User %s attempted to submit an order without permissions.', user.userId);
                    request.respond(statusCodes.FORBIDDEN, 'You do not have permission to submit orders.');
                }
            }
        });
};

