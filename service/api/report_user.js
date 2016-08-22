exports.post = function(request, response) {
    // Request body values
    var user_id      = request.body.user_id;
    var points      = request.body.points;
    var reporter    = request.body.reporter;
    // Tables
    var userTable   = request.service.tables.getTable('Users');  
    var reportTable = request.service.tables.getTable('Reports');  
    var blockTable = request.service.tables.getTable('Block');  
    
    // Get all records with reporter equals reporter and culprit equals user_id
    reportTable.where({reporter : reporter, culprit : user_id}).read({
        // Set point column to points+request points
        success: function(results){
            //response.send(statusCodes.OK, { result : results});
            if(results.length == 0){
                userTable.where({id : user_id}).read({
                    success : function(users){
                        response.send(statusCodes.OK, { result : users,id: user_id});
                        if(users.length > 0){
                            
                            users[0].points += 1;
                            userTable.update(users[0],{
                                // Insert new report
                                success : function(user){
                                       reportTable.insert({
                                            reporter : reporter,
                                            culprit  : user_id
                                        },{
                                            // insert new block
                                            success: function(obj){
                                                blockTable.insert({
                                                    blocker     : reporter,
                                                    blocky      : user_id,
                                                    both        : reporter+user_id,
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
                            response.send(statusCodes.OK, { result : "1. No such user exists.", status : 0});
                        }
                    }
                });
            }
            else {
                response.send(statusCodes.OK, { result : "2. Report already exists.", status : 0});
            }
        }
    });
};

