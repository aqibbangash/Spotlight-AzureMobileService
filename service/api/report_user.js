exports.post = function(request, response) {
    // Request body values
    var userId      = request.body.user_id;
    var points      = request.body.points;
    var reporter    = request.body.reporter;
    // Tables
    var userTable   = request.service.tables.getTable('Users');  
    var reportTable = request.service.tables.getTable('Reports');  
    var blockTable = request.service.tables.getTable('Block');  
    
    // Get all records with reporter equals reporter and culprit equals userId
    reportTable.where({reporter : reporter, culprit : userId}).read({
        // Set point column to points+request points
        success: function(results){
            //response.send(statusCodes.OK, { result : results});
            if(results.length == 0){
                userTable.where({user_id : userId}).read({
                    success : function(users){
                        if(users.count > 0){
                            users[0].points += 1;
                            userTable.update(users[0],{
                                success : function(user){
                                    
                                }
                            });
                        }
                        else {
                            response.send(statusCodes.OK, { result : "No such user exists.", status : 0});
                        }
                    }
                });
            }
            else {
                response.send(statusCodes.OK, { result : "No report exists.", status : 0});
            }
        }
    });
};

