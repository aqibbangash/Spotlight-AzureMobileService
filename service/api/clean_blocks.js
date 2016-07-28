exports.post = function(request, response) {     
    // Tables
    var blockTable    = request.service.tables.getTable('Block');  
    // get all records with blocktype 1
    blockTable.where({blocktype : '1'}).read({
        // delete all record in blockTable
        success: function(results) {
            if (results.length > 0) {
                results.foreach(function(result){
                    blockTable.del(result,{
                        success:function(res){
                            response.send(statusCodes.OK, { message : "All blocks clear."});
                        }
                    });
                });
            } 
            else {
                  response.send(statusCodes.OK, { message : "There are no blocks."});
            }
        }
    });
};

