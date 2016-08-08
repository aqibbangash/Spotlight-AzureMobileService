exports.post = function(request, response) {
    // Request body values
    var userId  = request.body.user_id;
    // Tables
    var requestTable    = request.service.tables.getTable('Request');  
    // Get all record with id equals userId  
    requestTable.where({id : userId,__deleted : false}).read({
        // Set _delete column to true
        success: function(results) {
            if (results.length > 0) {
                results[0].__deleted=true;
                requestTable.update(results[0],{
                    success:function(res){
                        response.send(statusCodes.OK, { result : res, status : 1});
                    } 
                });
            } 
            else {
                  response.send(statusCodes.OK, { result : "No requests for this user.", status : 0});
            }
        }
    });
};

