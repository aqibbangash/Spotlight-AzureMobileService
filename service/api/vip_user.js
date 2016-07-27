exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var userTable    = request.service.tables.getTable('Users');  

        userTable.where({
            id: userId
        }).read({
            success: function(results) {
               response.send(statusCodes.OK, { result : results});
               // if (results.length > 0) {
                   // results[0].vip=true;
                   // userTable.update(results[0],{
                      // success:function(res){
                    //        response.send(statusCodes.OK, { result : res});
                  //     } 
                //    });
              //  } else {
              //      response.send(statusCodes.OK, { result : "No such user exists."});
              //  }
            }
        });
};

