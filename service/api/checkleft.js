exports.post = function(request, response) {
   
    var user_id = request.body.user_id;
﻿    var dialog_id = request.body.dialog_id;
    
    var leftRoomTable    = request.service.tables.getTable('leftRoom');  
    leftRoomTable.where({dialog_id : dialog_id,user_id : user_id}).read({
        success : function(users){
            if(users.length > 0){
                // Update
                users[0].timecreated = (new Date()).getTime();
                leftRoomTable.update(users[0],{
                   success : function(user){
                       // 2nd phase
                       var currentSecond = (new Date()).getTime();
                       leftRoomTable.where(function(d_id,u_id,cs,tt){return this.user_id ==  u_id && this.dialog_id == d_id && (tt - cs) > 5000},dialog_id,user_id,parseFloat(currentSecond),parseFloat(this.timecreated)).read({
                           success : function(users){
                               console.log("users : ",users);
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
                var currentSecond = (new Date()).getTime();
                leftRoomTable.insert({dialog_id : dialog_id,user_id : user_id, timecreated : currentSecond},{
                    success : function(user){
                        // 2nd phase
                        leftRoomTable.where(function(d_id,u_id,cs,tc)
                        {
                            return this.user_id ==  u_id && this.dialog_id == d_id && (tc - cs) > 5000
                        }
                        ,dialog_id,user_id,parseFloat(currentSecond),parseFloat(this.timecreated)
                        ).read({
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