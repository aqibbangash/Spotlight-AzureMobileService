exports.post = function(request, response) {
    
    var usersTable = request.service.tables.getTable('users');
    
    
};

exports.get = function(request, response) {
    var sendgrid = require('sendgrid')(azure_391f99ebb5506b93a27577ef7cd597f5@azure.com,4mxJQRASw6ysjE1);
    sendgrid.send({
            to: 'murtazhaider@sofittech.com',
            from: 'murtazshah@gnmail.com',
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