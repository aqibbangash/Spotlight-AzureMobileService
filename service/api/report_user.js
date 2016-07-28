exports.post = function(request, response) {
    // Request body values
    var userId      = request.body.user_id;
    var points      = request.body.points;
    var reporter    = request.body.reporter;
    // Tables
    var userTable   = request.service.tables.getTable('Users');  
    var reportTable = request.service.tables.getTable('Reports');  
    
    // Get all records with reporter equals reporter and culprit equals userId
    reportTable.where({reporter:request.body.reporter,culprit:request.body.user_id}).read({
        // 
        success: function(results){
            if(results.length == 0){
                userTable.where({id : userId}).read({
                    success:function(res){
                        res.points += points;
                        userTable.update(res,{
                            success:function(r){
                                //response.send(statusCodes.OK, { result : "User point update."});                
                            }
                        })
                    }
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

