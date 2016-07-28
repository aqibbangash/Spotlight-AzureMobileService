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
    reportTable.where({reporter:request.body.reporter,culprit:request.body.user_id}).read({
        // Set point column to points+request points
        success: function(results){
            if(results.length == 0){
                userTable.where({id : userId}).read({
                    success:function(res){
                        res.points += points;
                        userTable.update(res,{
                            // Insert record in reports table 
                            success:function(r){
                                //response.send(statusCodes.OK, { result : "User point update."});   
                                reportTable.insert({reporter : reporter,culprit : userId},{
                                    // Insert record in block table
                                    success: function (items) {
                                        response.send(statusCodes.OK, { result : items,status : 1});
                                    //    blockTable.insert({ blocker   : reporter,
                                    //                        blocky    : userId,
                                    //                        both      : userId+reporter,
                                    //                        blocktype : '1'},{
                                    //                           success:function(blockRecord){
                                    //                               response.send(statusCodes.OK, { result : blockRecord,status : 1});
                                    //                           } 
                                    //                        });
                                    }
                                });             
                            }
                        })
                    }
                });
            }
            else {
                response.send(statusCodes.OK, { result : "No such user exists.", status : 0});
            }
        }
    });
};

