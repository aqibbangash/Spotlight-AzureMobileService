exports.post = function(request, response) {
    // Tables
    var blockTable    = request.service.tables.getTable('Block');  

        blockTable.where({
            blocktype       : '1'
        }).read({
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

