exports.post = function(request, response) {
    // Tables
    var requestTable    = request.service.tables.getTable('Request');  
    // Local variable
    var currentDateTime  = new Date();
        requestTable.where(
            function(dt){
            return(this.__createdAt < dt)
        },currentDateTime
        ).read({
            success: function(results) {
                        if (results.length > 0) {
                            results.foreach(function(result){
                                result.__deleted=true;
                                requestTable.update(result,{
                                    success:function(res){
                                        response.send(statusCodes.OK, { message : "A chat cleared."});
                                    }
                                });
                            });
                        } 
                        else {
                              response.send(statusCodes.OK, { message : "There are no chats present."});
                        }
                }
        });
};

