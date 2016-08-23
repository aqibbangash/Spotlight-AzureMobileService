exports.post = function(request, response) {
    // Requset body values 
    var userId          = request.body.user_id;
    // Tables
    var blockTable    = request.service.tables.getTable('Block');  
    // Local variables
    var result    = "";
    
    var getFlag = function(str){return str.indexOf(userId);}
    // Get block user by Id
    blockTable.where(function(u){return this.both.indexOf(u)!== -1;},userId).read({
        // add Id present in object
        success : function(res){
            console.log("result 1 : ",res);
            var flag = getFlag(res[0].both);
            console.log("flag : ",flag);
            if(flag!=-1 && flag){
                result+=res[0].both;
            }
            console.log("result 2: ",result);
            response.send(statusCodes.OK, { returning : result});
        }// Function success end
    });// Block table query end 
    response.send(statusCodes.OK, { returning : result});
};