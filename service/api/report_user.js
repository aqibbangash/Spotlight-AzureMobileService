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
                userTable.where({id : userId}).read({
                    success : function(users){
                        if(users.count > 0){
                            users[0].points += points;
                            userTable.update(users[0],{
                                // Insert new report
                                success : function(user){
                                       reportTable.insert({
                                            reporter : reporter,
                                            culprit  : userId
                                        },{
                                            // insert new block
                                            success: function(obj){
                                                blockTable.insert({
                                                    blocker     : reporter,
                                                    blocky      : userId,
                                                    both        : reporter+userId,
                                                    blocktype   : '1'
                                                },{
                                                    success : function(res){
                                                        response.send(statusCodes.OK, { status : 1 });
                                                    }
                                                })
                                            }
                                        });  
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

