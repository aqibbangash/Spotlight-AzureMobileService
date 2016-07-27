exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var userTable    = request.service.tables.getTable('Users');  

        userTable.where({
            userId: userId
        }).read({
            success: function(results) {
                            response.send(statusCodes.OK, { result : results});
                
            }
        });
};

