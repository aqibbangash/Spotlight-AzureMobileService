exports.post = function(request, response) {
   
    var user_id = request.body.user_id;
﻿    var dialog_id = request.body.dialog_id;
    
    var leftRoomTable    = request.service.tables.getTable('leftRoom');  
    
    leftRoomTable.where({id : dialog_id,user_id : user_id}).read({
        success : function(users){
            if(users.length > 0){
                // Update
                leftRoomTable.update(users[0],{
                   success : function(user){
                       // 2nd phase
                       var currentSecond = (new Date()).getSeconds();
                       leftRoomTable.where(function(d_id,u_id){return this.user_id ==  u_id && this.dialog_id == d_id && ((new Date(this.__updatedAt.getSeconds())).getSeconds() - currentSecond) > 5}).read({
                           success : function(users){
                               if(users.length > 0){
                                   // online
                               }
                               else {
                                   // offline
                               }
                           }
                       });
                   }  
                });
            }
            else {
                // Create
                leftRoomTable.insert({user_id : user_id},{
                    success : function(user){
                        // 2nd phase
                    }
                });
            }        
        }
    });
    
    // search dialog for user_id update time if present 
     
     
     
    // response.send(statusCodes.OK, { message : userId });
   
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : request.params.id });
};