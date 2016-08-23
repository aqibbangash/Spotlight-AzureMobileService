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
            console.log("result : ",res);
            var flag = (res.both).indexOf(res.id);
            console.log("flag : ",flag);
            if(flag!=-1 && flag){
                result+=res.both;
            }
            console.log("result : ",result);
            response.send(statusCodes.OK, { returning : result});
        }// Function success end
    });// Block table query end 
    response.send(statusCodes.OK, { returning : result});
};