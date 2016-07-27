exports.post = function(request, response) {
    // Tables
    var userTable   = request.service.tables.getTable('Users');  
    var reportTable = request.service.tables.getTable('Reports');  
    
    
    reportTable.where({reporter:request.body.reporter,culprit:request.body.user_id}).read({
        success: function(results){
            if(results.length>0){
                results.foreach(function(result){
                    userTable.where({id:request.body.user_id}).read({
                        success:function(res){
                            res.points+=request.body.points
                            userTable.update(res,{
                                success: function(r){
                                    //report insert
                                }
                            });
                        }
                    });
                });
            }
            else {
                response.send(statusCodes.OK, { result : "No such user exists."});
            }
        }
    });
    
    userTable.where({
        id       : request.body.user_id
    }).read({
        success: function(results) {
                    if (results.length > 0) {
                        results[0].points++;
                         userTable.update(results[0],{
                                        success:function(res){
                                            response.send(statusCodes.OK, { result : res});
                                            //reportTable.insert(res,{
                                             //  succeess:function(r){
                                             //      response.send(statusCodes.OK, { result : r});
                                            //   } 
                                           // });
                                        } 
                          });
                        } 
                        else {
                              response.send(statusCodes.OK, { result : "No such user exists."});
                        }
                }
    });
};

