exports.post = function(request, response) {
   
    var user_id = request.body.user_id;
﻿    var dialog_id = request.body.dialog_id;
    
    var leftRoomTable    = request.service.tables.getTable('leftRoom');  
    leftRoomTable.where({id : dialog_id,user_id : user_id}).read({
        success : function(users){
            if(users.length > 0){
                // Update
                console.log("yep 1");
                users[0].timecreated = (new Date()).getTime();
                leftRoomTable.update(users[0],{
                   success : function(user){
                       // 2nd phase
                       console.log("yep 2 ", user);
                       var currentSecond = (new Date()).getTime();
                       console.log("time ",currentSecond );
                       leftRoomTable.where(function(d_id,u_id){return this.user_id ==  u_id && this.dialog_id == d_id && ((new Date(this.timecreated).getTime()) - currentSecond) > 5},dialog_id,user_id).read({
                           success : function(users){
                               console.log("yep 3");
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
                var CurrentDate = new Date();
                leftRoomTable.insert({user_id : user_id, timecreated : CurrentDate},{
                    success : function(user){
                        // 2nd phase
                       var currentSecond = (new Date()).getSeconds();
                       leftRoomTable.where(function(d_id,u_id){return this.user_id ==  u_id && this.dialog_id == d_id && ((new Date(this.timecreated.getSeconds())).getSeconds() - currentSecond) > 5},dialog_id,user_id).read({
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