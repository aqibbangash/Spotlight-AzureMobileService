exports.post = function(request, response) {
    // Tables
    var userTable    = request.service.tables.getTable('Users');  
    
    userTable.insert({
        first_name:"test",
        last_name:"test1",
        gender:"a",
        country:"Pakistan",
        city:"Islamabad",
        age:"34",
        quickblox_id:"",
        profile_pic:"",
        email:"test@yahoo.com",
        password:"12345",
        points:"100",
        prefs:"M",
        vip:false
    },{
        success: function(obj){
            response.send(statusCodes.OK, { message : obj });
        }
    });    
};