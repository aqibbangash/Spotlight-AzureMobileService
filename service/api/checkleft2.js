exports.post = function(request, response) {
   
    var user_id = request.body.user_id;
﻿    var dialog_id = request.body.dialog_id;

    var leftTable = request.service.tables.getTable('leftRoom');
    
    leftTable.where({user_id:user_id, dialog_id:dialog_id }).read(
        {
            success: function(entries)
            {
                var currentTime = (new Date()).getTime();
                if (entries.length> 0)
                {
                    
                }
                else
                {
                    leftTable.insert({user_id:user_id, dialog_id:dialog_id, timecreated: currentTime}, {
                        
                        success: function(inserted){
                            console.log("Entry placed: ", inserted);
                            response.send({enntry: inserted});
                        }
                    })
                }
            }
        }
    )
    
    
  };