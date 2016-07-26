exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var blockTable    = request.service.tables.getTable('Block');  
    // Local variables
    var result    = "";
     
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

//exports.get = function(request, response) {
//    response.send(statusCodes.OK, { message : 'Hello World!' });
//};