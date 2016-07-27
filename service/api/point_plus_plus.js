exports.post = function(request, response) {
    // Tables
    var userTable    = request.service.tables.getTable('Users');  
    var reportTable    = request.service.tables.getTable('Reports');  
    
    userTable.where({
        id       : request.body.user_id
    }).read({
        success: function(results) {
                    if (results.length > 0) {
                        results[0].points++;
                         userTable.update(results[0],{
                                        success:function(res){
                                            //response.send(statusCodes.OK, { result : res});
                                            
                                        } 
                          });
                        } 
                        else {
                              response.send(statusCodes.OK, { result : "No such user exists."});
                        }
                }
    });
};

