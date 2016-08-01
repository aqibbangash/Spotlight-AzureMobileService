exports.post = function(request, response) {
    // Insert
    // Tables
   // var userTable    = request.service.tables.getTable('Users');  
   // userTable.insert({
   //     first_name:"test",
   //     last_name:"test1",
   //    gender:"a",
   //     country:"Pakistan",
   //     city:"Islamabad",
   //     age:"34",
   //     quickblox_id:"",
   //     profile_pic:"",
   //     email:"test@yahoo.com",
   //     password:"12345",
   //     points:"100",
   //     prefs:"M",
   //     vip:false
   // },{
   //     success: function(obj){
   //         response.send(statusCodes.OK, { message : obj });
   //     }
   // });    
    
    // Update
    var requestTable    = request.service.tables.getTable('Request');
    
    requestTable.where({user_id:'13399'}).read({
        success:function(res){
           // res.forEach(function(r){
           //     r.__deleted=false;
          //      requestTable.update(r,{
          //         success: function(end){
                     response.send(statusCodes.OK, { message : res });
           //        } 
           //     });
           // });
        }
    });
};