exports.post = function(request, response) {
    // Tables
    var chatRoomTable    = request.service.tables.getTable('ChatRoom');  
    // Local variable
    var currentDateTime  = new Date();
        chatRoomTable.where(
            function(dt){
            return(this.__createdAt < dt)
        },currentDateTime
        ).read({
            success: function(results) {
                        if (results.length > 0) {
                            results.foreach(function(result){
                                result.__deleted=true;
                                chatRoomTable.update(result,{
                                    success:function(res){
                                        response.send(statusCodes.OK, { message : "A room cleared."});
                                    }
                                });
                            });
                        } 
                        else {
                              response.send(statusCodes.OK, { message : "There are no rooms present."});
                        }
                }
        });
};

