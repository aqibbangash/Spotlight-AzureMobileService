exports.post = function(request, response) {
   
    var user_id = request.body.user_id;
﻿    var dialog_id = request.body.dialog_id;

    var leftTable = request.service.tables.getTable('leftRoom');
    
    var currentTime = (new Date()).getTime();
    
    
    var thisFn = function(){
        
       

        leftTable.where(function(c_time, created_at, u_id, d_id){ return (this.user_id != u_id)}, currentTime, parseFloat(this.timecreated), user_id, dialog_id).read({
         
         success: function(en)
         {
             if (en.length>0)
             {
              if (currentTime-parseFloat(en[0].timecreated)<5000)
              response.send({"boolean": true, "found":en.length}); 
              else
              response.send({"boolean": false, "found":en.length });  
             }
             else
             {
               response.send({"boolean": false, "found":0});
             }

         }   
            
        })
        
    }
    
    leftTable.where({user_id:user_id, dialog_id:dialog_id }).read(
        {
            success: function(entries)
            {
                
                if (entries.length> 0)
                {
                    entries[0].timecreated = currentTime;
                    leftTable.update(entries[0], {
                        
                        success: function(inserted){
                            console.log("Entry updated: ", inserted.timecreated);
                            //response.send({"Entry updated: ": inserted.timecreated});
                            thisFn();
                        }
                    })
                }
                else
                {
                    leftTable.insert({user_id:user_id, dialog_id:dialog_id, timecreated: currentTime}, {
                        
                        success: function(inserted){
                            console.log("Entry placed: ", inserted.timecreated);
                            //response.send({"Entry created: ": inserted.timecreated});
                            thisFn();
                        }
                    })
                }
            }
        }
    )
    
    
  };