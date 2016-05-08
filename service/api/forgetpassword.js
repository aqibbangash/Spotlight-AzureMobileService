exports.post = function(request, response) {
    var userId = request.body.email;
    var usersTable = request.service.tables.getTable('users');
    usersTable.where({email:userId}).read(
        {
            success: function(result){
                response.send(statusCodes.OK,{data:result});
            }
        }
        );
    
    
};

exports.get = function(request, response) {
    var SendGrid = require('sendgrid').SendGrid;
    var sendgrid = new SendGrid('azure_391f99ebb5506b93a27577ef7cd597f5@azure.com', '4mxJQRASw6ysjE1');
    sendgrid.send({
            to: 'murtazhaider@sofittech.com',
            from: 'murtazshah@gmail.com',
            subject: 'Forget Password',
            text: 'A new to-do was added: '
        }, function(success, message) {
            // If the email failed to send, log it as an error so we can investigate
            if (!success) {
                console.error(message);
            }
            else{
                response.send(statusCodes.OK, { message : 'Hello World!' });
            }
        });
};