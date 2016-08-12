exports.post = function(request, response) {
    // Use "request.service" to access features of your mobile service, e.g.:
       var friendsTable = request.service.tables.getTable('leftRoom');
    //   var push = request.service.push;

    var userId = request.body.id;
    var entry = request.body.entry;
    
    if (entry)
    {
        friendsTable.insert({user_id:userId});  
        response.send(statusCodes.OK, { message : "Entry has been made" }); 
    }
    else
    {
        
         var dd = (new Date()).getTime();
        
        friendsTable.where({user_id:userId }).read({

        success: function(r) {
        
        if (r.length>0)
        {
            
           response.send(statusCodes.OK, { message : "User has left", left: true, time: r[0], myTime: dd }); 
        }
        else
        {
            response.send(statusCodes.OK, { message : "User has NOT left", left: false });
        }
        
            
        }                   
         
            
            
        })
    }
    
     //response.send(statusCodes.OK, { message : userId });
     
     //friendsTable.where({ })
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : request.params.id });
};