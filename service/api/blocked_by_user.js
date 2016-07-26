exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var blockTable    = request.service.tables.getTable('Block');  
    // Local variables
    var _return    = "";
     
     blockTable.where({both:userId}).read({
        success : function(res){
            response.send(statusCodes.OK, {message: "Success", result: res,"user":this});
        }// Function success end
    });// Block table query end 
     
          

    //response.send(statusCodes.OK, { message : _return});
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};