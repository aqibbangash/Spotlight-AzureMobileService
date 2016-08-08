exports.post = function(request, response) {
    // Request body values
    var userId      = request.body.user_id;
    var reporter    = "";
    // Tables
    var userTable   = request.service.tables.getTable('Users');  
    var reportTable = request.service.tables.getTable('Reports');  
    // Get all records with id equals userId 
    userTable.where({id : userId}).read({
        // Set point column to plus one
        success: function(results) {
            if (results.length > 0) {
                results[0].points++;
                userTable.update(results[0],{
                    // Insert new record in reports
                    success:function(res){
                        //response.send(statusCodes.OK, { result : res});
                        reportTable.insert({reporter:reporter,culprit : userId},{
                            success: function (items) {
                                response.send(statusCodes.OK, { result : items, status : 1});
                            }
                        });
                    } 
              });
            } 
            else {
                  response.send(statusCodes.OK, { result : "No such user exists."});
            }
        }
    });
};

