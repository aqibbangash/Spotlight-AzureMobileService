exports.post = function(request, response) {
    // Tables
    var chatRoomTable    = request.service.tables.getTable('ChatRoom');  
    // Local variable
    var currentDate  = new Date();
    
    // Get all record with date less then currentDate
    chatRoomTable.where(function(dt){return(this.__createdAt < dt)},currentDate).read({
        // Set __delete column to true
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

