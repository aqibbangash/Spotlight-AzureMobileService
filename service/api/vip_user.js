exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var userTable    = request.service.tables.getTable('Users');  
    // Local variables
    var result    = "";

    function update(item, user, request) {
    
        userTable.where({
            userId: user.userId,
            permission: 'submit order'
        }).read({
            success: function(results) {
                if (results.length > 0) {
                    // Permission record was found. Continue normal execution.
                    request.execute();
                } else {
                    console.log('User %s attempted to submit an order without permissions.', user.userId);
                    request.respond(statusCodes.FORBIDDEN, 'You do not have permission to submit orders.');
                }
            }
        });
    }
     
     blockTable.where({both:userId}).read({
        success : function(res){
            var flag = (res.both).indexOf(res.id);
            if(flag!=-1 && flag){
                result+=res.both;    // add of id present in object
            }
        }// Function success end
    });// Block table query end 
    response.send(statusCodes.OK, { result : result});
};

