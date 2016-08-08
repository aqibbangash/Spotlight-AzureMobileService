exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var blockTable    = request.service.tables.getTable('Block');  
    // Local variables
    var result    = "";
    // Get block user by Id
    blockTable.where(function(u){return this.both.indexOf(u)!== -1;},userId).read({
        // add Id present in object
        success : function(res){
            var flag = (res.both).indexOf(res.id);
            if(flag!=-1 && flag){
                result+=res.both;    
            }
        }// Function success end
    });// Block table query end 
    response.send(statusCodes.OK, { result : result});
};