exports.post = function(request, response) {
   
    var user_id = request.body.user_id;
﻿    var dialog_id = request.body.dialog_id;
    
    var leftRoomTable    = request.service.tables.getTable('leftRoom');  
    console.log("yep");
    leftRoomTable.where({id : dialog_id,user_id : user_id}).read({
        success : function(users){
            if(users.length > 0){
                // Update
                leftRoomTable.update(users[0],{
                   success : function(user){
                       // 2nd phase
                       var currentSecond = (new Date()).getSeconds();
                       leftRoomTable.where(function(d_id,u_id){return this.user_id ==  u_id && this.dialog_id == d_id && ((new Date(this.__updatedAt.getSeconds())).getSeconds() - currentSecond) > 5},dialog_id,user_id).read({
                           success : function(users){
                               if(users.length > 0){
                                   // online
                                   response.send(statusCodes.OK, { boolean : true });
                               }
                               else {
                                   // offline
                                   response.send(statusCodes.OK, { boolean : false });
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
                       var currentSecond = (new Date()).getSeconds();
                       leftRoomTable.where(function(d_id,u_id){return this.user_id ==  u_id && this.dialog_id == d_id && ((new Date(this.__createdAt.getSeconds())).getSeconds() - currentSecond) > 5},dialog_id,user_id).read({
                           success : function(users){
                               if(users.length > 0){
                                   // online
                                   response.send(statusCodes.OK, { boolean : true });
                               }
                               else {
                                   // offline
                                   response.send(statusCodes.OK, { boolean : false });
                               }
                           }
                       });                        
                    }
                });
            }        
        }
    });
  };