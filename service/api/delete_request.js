exports.post = function(request, response) {
    // Tables
    var requestTable    = request.service.tables.getTable('Request');  

        requestTable.where({
            id        : request.body.user_id,
            __deleted : false
        }).read({
            success: function(results) {
                        if (results.length > 0) {
                             results[0].__deleted=true;
                             requestTable.update(results[0],{
                                         success:function(res){
                                                    response.send(statusCodes.OK, { result : res});
                                                } 
                            });
                        } 
                        else {
                              response.send(statusCodes.OK, { result : "No requests for this user."});
                        }
                }
        });
};

