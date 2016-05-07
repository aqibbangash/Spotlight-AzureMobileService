exports.post = function(request, response) {
    
    var username = request.body.username;
    var password = request.body.password;
    
    var userStable = tables.getTable("users");
    
    userStable.find().then(function(result){
       
       response.send(statusCodes.OK, { message : 'Hello World!' });
       
    })
    
    
};

exports.get = function(request, response) {
    response.send(statusCodes.OK, { message : 'Hello World!' });
};