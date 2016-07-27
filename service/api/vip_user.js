exports.post = function(request, response) {
    // Tables
    var userTable    = request.service.tables.getTable('Users');  

        userTable.where({
            id: request.body.id
        }).read({
            success: function(results) {
                response.send(statusCodes.OK, { result : results,request:request.body});
                        if (results.length > 0) {
                             results[0].vip=true;
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

