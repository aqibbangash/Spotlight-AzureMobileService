exports.post = function(request, response) {
    var SendGrid = require('sendgrid').SendGrid;
    var sendgrid = new SendGrid('azure_391f99ebb5506b93a27577ef7cd597f5@azure.com', '4mxJQRASw6ysjE1');
    var userId = request.body.email;
    var usersTable = request.service.tables.getTable('users');
    usersTable.where({email:userId}).read(
        {
            success: function(result){
                if(result.length>0){
                    var to = result[0].email;
                    var from = "murtazshah@gmail.com";
                    sendgrid.send({
                    to: to,
                    from: from,
                    subject: 'Forget Password',
                    text:'Dear '+result[0].first_name+' '+result[0].last_name+',\n\r'+ 'We have received a forgot password request from your side. Your spotight credentials are'+'\n\r'+'Username: '+result[0].email+'\n\r'+'Password: '+result[0].password+'\n\r\n\r'+'Regards'+'\n\r'+'SpotLightRC Team'
        }, function(success, message) {
            // If the email failed to send, log it as an error so we can investigate
            if (!success) {
                console.error(message);
            }
            else{
                response.send(statusCodes.OK, { status : true });
            }
        });
                }
                
            }
        }
        );
    
    
};

exports.get = function(request, response) {
    
    
};